import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yup } from "../Services/Calculo/Yup";
import { useAppConfig } from "../Contexts";
import { ValidationError } from "yup";
import { calcularPreco3d } from "../Services/Calculo";
import { IPreview } from "./Preview";

export interface IForm {
    nome?: string;
    tempoHora?: number;
    tempoMin?: number;
    peso: number;
    quantidade: number;
    lucroPercentual: number;
    valorAdicional?: number;
}

export type IHistoricoItem = IPreview & IForm & {
    id: number;
    data: string;
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

    const gerarId = () => Date.now() + Math.floor(Math.random() * 1000);

    const tempoHora = watch("tempoHora");
    const tempoMin = watch("tempoMin");
    const peso = watch("peso");
    const lucroPercentual = watch("lucroPercentual");
    const valorAdicional = watch("valorAdicional");
    const quantidade = watch("quantidade");

    const preview = useMemo(() => {
        return calcularPreco3d({
            config,

            data: {
                tempoHora: tempoHora || 0,
                tempoMin: tempoMin || 0,
                peso,
                lucroPercentual,
                valorAdicional,
                quantidade,
            }
        });
    }, [tempoHora, tempoMin, peso, lucroPercentual, valorAdicional, quantidade, config]);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        salvarHistorico({
            id: gerarId(),
            data: new Date().toLocaleString(),

            valorAdicional: data.valorAdicional ?? 0,
            resultado: preview,

            ...data,
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
            tempoHora: tempoHora || 0,
            tempoMin: tempoMin || 0,
            peso,
            lucroPercentual,
            valorAdicional,
            quantidade,
            config,
            resultado: preview,
        },
    };
};
