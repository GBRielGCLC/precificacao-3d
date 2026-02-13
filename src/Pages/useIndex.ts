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
    lucroPercentual: number;
    valorAdicional?: number;
}

const STORAGE_KEY = "precificacao_3d_historico";

const schema = yup.object({
    nome: yup.string(),
    tempoMin: yup.number().required().positive(),
    peso: yup.number().required().positive(),
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
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            lucroPercentual: config.lucroPadrao,
            valorAdicional: undefined,
            peso: undefined,
            nome: "",
            tempoMin: undefined,
        }
    });

    useEffect(() => {
        setValue("lucroPercentual", config.lucroPadrao);
    }, [config.lucroPadrao, setValue]);

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

    const calcular = useCallback(({
        tempoMin,
        peso,
        lucroPercentual,
        valorAdicional = 0,
    }: {
        tempoMin: number;
        peso: number;
        lucroPercentual: number;
        valorAdicional?: number;
    }) => {
        const custoTempo = tempoMin * config.custoMinuto;
        const custoMaterial = peso * config.custoGrama;

        const custoBase = custoTempo + custoMaterial;

        const valorFinal =
            (custoBase + custoBase * (lucroPercentual / 100)) + valorAdicional;

        return { custoBase, valorFinal };
    }, [config.custoGrama, config.custoMinuto]);

    const gerarId = () => Date.now() + Math.floor(Math.random() * 1000);

    const tempoMin = watch("tempoMin");
    const peso = watch("peso");
    const lucroPercentual = watch("lucroPercentual") ?? config.lucroPadrao;
    const valorAdicional = watch("valorAdicional");

    const preview = useMemo(() => {
        if (!tempoMin || !peso || lucroPercentual === undefined) return null;

        return calcular({
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional,
        });
    }, [tempoMin, peso, lucroPercentual, valorAdicional, calcular]);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const { custoBase, valorFinal } = calcular(data);

        salvarHistorico({
            id: gerarId(),
            ...data,
            custoBase,
            valorFinal,
            data: new Date().toLocaleString(),
        });

        reset({ lucroPercentual: config.lucroPadrao, });
    };

    return {
        openConfig,

        historico,
        limparHistorico,
        handleSubmit: handleSubmitHookForm(onSubmit),
        control,

        preview: {
            tempoMin,
            peso,
            lucroPercentual,
            valorAdicional,
            config,
            resultado: preview,
        },
    };
};
