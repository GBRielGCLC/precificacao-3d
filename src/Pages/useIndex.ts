import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yup } from "../Yup";
import { useAppConfig } from "../Contexts";

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

const STORAGE_KEY = "precificacao_3d_historico";

const schema = yup.object({
    nome: yup.string(),
    tempoMin: yup.number().required().positive(),
    peso: yup.number().required().positive(),
    quantide: yup.number().required().positive(),
    lucroPercentual: yup.number().required().min(0),
    valorAdicional: yup.number(),
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
            quantide: undefined,
            nome: "",
            tempoMin: undefined,
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

    const limparHistorico = () => {
        setHistorico([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const calcular = useCallback(
        ({
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional = 0,
            quantidade,
        }: {
            tempoMin: number;
            peso: number;
            lucroPercentual: number;
            valorAdicional?: number;
            quantidade: number;
        }) => {
            let custoTempo = 0;
            if (!!tempoMin && tempoMin > 0)
                custoTempo = tempoMin * config.custoMinuto;

            let custoMaterial = 0;
            if (!!peso && peso > 0)
                custoMaterial = peso * (config.custoKG / 1000);

            const custoBase = custoTempo + custoMaterial;

            let valorFinal = custoBase;
            let valorPorcentagem = 0;

            if (!!lucroPercentual && lucroPercentual > 0){
                
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

    const tempoMin = watch("tempoMin");
    const peso = watch("peso");
    const lucroPercentual = watch("lucroPercentual");
    const valorAdicional = watch("valorAdicional");
    const quantidade = watch("quantide");

    const preview = useMemo(() => {
        //if (!tempoMin || !peso || lucroPercentual === undefined) return null;

        return calcular({
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional,
            quantidade,
        });
    }, [tempoMin, peso, lucroPercentual, valorAdicional, quantidade, calcular]);

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
        limparHistorico,
        //@ts-expect-error
        handleSubmit: handleSubmitHookForm(onSubmit),
        control,

        preview: {
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
