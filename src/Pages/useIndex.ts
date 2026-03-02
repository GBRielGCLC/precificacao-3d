import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yup } from "../Yup";
import { useAppConfig } from "../Contexts";
import { ValidationError } from "yup";

export interface IHistoricoItem {
    id: number;
    nome?: string;
    tempoMin: number;
    peso: number;
    lucroPercentual: number;
    valorAdicional?: number;
    custoBase: number;
    valorFinal: number;
    data: string;
}

export interface IForm {
    nome?: string;
    tempoMin: number;
    peso: number;
    quantidade: number;
    lucroPercentual: number;
    valorAdicional?: number;
}

interface IFuncaoCalcular {
    tempoHora?: number | null;
    tempoMin?: number | null;
    peso: number;
    lucroPercentual: number;
    valorAdicional?: number;
    quantidade: number;
}

const STORAGE_KEY = "precificacao_3d_historico";

const schema = yup.object({
    nome: yup.string(),

    tempoHora: yup.number().nullable(),
    tempoMin: yup.number().nullable(),

    peso: yup.number().required().positive(),
    quantidade: yup.number().required().positive(),
    lucroPercentual: yup.number().required().min(0),
    valorAdicional: yup.number(),
}).test("tempo-obrigatorio", function (value) {
    const { tempoHora, tempoMin } = value || {};

    const valido =
        (typeof tempoHora === "number" && tempoHora > 0) ||
        (typeof tempoMin === "number" && tempoMin > 0);

    if (valido) return true;

    return new ValidationError([
        this.createError({
            path: "tempoHora",
            message: "Informe horas ou minutos",
        }),
        this.createError({
            path: "tempoMin",
            message: "Informe horas ou minutos",
        }),
    ]);
});

export const useIndex = () => {
    const { config, openConfig } = useAppConfig();

    const {
        handleSubmit: handleSubmitHookForm,
        control,
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            lucroPercentual: undefined,
            valorAdicional: undefined,
            peso: undefined,
            quantidade: undefined,
            nome: "",
            tempoMin: undefined,
            tempoHora: undefined,
        },
    });

    useEffect(() => {
        setValue("lucroPercentual", 50);
    }, [setValue]);

    const [historico, setHistorico] = useState<IHistoricoItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setHistorico(JSON.parse(stored));
    }, []);

    const salvarHistorico = (item: IHistoricoItem) => {
        const novo = [item, ...historico];
        setHistorico(novo);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novo));
    };

    const excluirHistoricoById = (id: number) => {
        const newHistorico = historico.filter((item) => item.id !== id);

        setHistorico(newHistorico);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistorico));
    }

    const limparHistorico = () => {
        setHistorico([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const calcular = useCallback(
        ({
            tempoHora,
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional = 0,
            quantidade,
        }: IFuncaoCalcular) => {
            let custoTempo = 0;
            if (!!tempoMin && tempoMin > 0)
                custoTempo = tempoMin * config.custoMinuto;

            if (!!tempoHora && tempoHora > 0)
                custoTempo += (tempoHora * 60) * config.custoMinuto;

            let custoMaterial = 0;
            if (!!peso && peso > 0)
                custoMaterial = peso * (config.custoKG / 1000);

            const custoBase = custoTempo + custoMaterial;

            let valorFinal = custoBase;
            let valorPorcentagem = 0;

            if (!!lucroPercentual && lucroPercentual > 0) {

                valorPorcentagem = custoBase * (lucroPercentual / 100)

                valorFinal =
                    custoBase +
                    valorPorcentagem +
                    valorAdicional;
            }

            let precoUnidade = valorFinal;

            if (!!quantidade && quantidade > 0)
                precoUnidade = valorFinal / quantidade;

            return {
                custoBase,
                valorFinal,
                precoUnidade,
                custoMaterial,
                custoTempo,
                valorPorcentagem,
            };
        },
        [config.custoKG, config.custoMinuto]
    );

    const gerarId = () => Date.now() + Math.floor(Math.random() * 1000);

    const tempoHora = watch("tempoHora");
    const tempoMin = watch("tempoMin");
    const peso = watch("peso");
    const lucroPercentual = watch("lucroPercentual");
    const valorAdicional = watch("valorAdicional");
    const quantidade = watch("quantidade");

    const preview = useMemo(() => {
        //if (!tempoMin || !peso || lucroPercentual === undefined) return null;

        return calcular({
            tempoHora,
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional,
            quantidade,
        });
    }, [tempoHora, tempoMin, peso, lucroPercentual, valorAdicional, quantidade, calcular]);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const { custoBase, valorFinal } = calcular(data);

        salvarHistorico({
            id: gerarId(),
            ...data,
            custoBase,
            valorFinal,
            data: new Date().toLocaleString(),
        });

        reset();
    };

    return {
        openConfig,

        historico,
        excluirHistoricoById,
        limparHistorico,
        //@ts-expect-error
        handleSubmit: handleSubmitHookForm(onSubmit),
        control,

        preview: {
            tempoHora,
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional,
            quantidade,
            config,
            resultado: preview,
        },
    };
};
