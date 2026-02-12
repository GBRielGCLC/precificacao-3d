import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yup } from "../Yup";

export interface IHistoricoItem {
    id: number;
    nome?: string;
    tempoMin: number;
    peso: number;
    lucroPercentual: number;
    embalagem?: number;
    custoBase: number;
    valorFinal: number;
    data: string;
}

interface IForm {
    nome?: string;
    tempoMin: number;
    peso: number;
    lucroPercentual: number;
    embalagem?: number;
}

const STORAGE_KEY = "precificacao_3d_historico";

const schema = yup.object({
    nome: yup.string(),
    tempoMin: yup.number().required().positive(),
    peso: yup.number().required().positive(),
    lucroPercentual: yup.number().required().min(0),
    embalagem: yup.number(),
});

export const useIndex = () => {
    const {
        handleSubmit: handleSubmitHookForm,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            lucroPercentual: undefined,
            embalagem: undefined,
            peso: undefined,
            nome: "",
            tempoMin: undefined,
        }
    });

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

    const calcular = ({
        tempoMin,
        peso,
        lucroPercentual,
        embalagem = 0,
    }: {
        tempoMin: number;
        peso: number;
        lucroPercentual: number;
        embalagem?: number;
    }) => {
        const custoMinuto = 0.03;
        const custoGrama = 0.15;

        const custoTempo = tempoMin * custoMinuto;

        const custoMaterial = peso * custoGrama;

        const custoBase = custoTempo + custoMaterial + embalagem;

        const valorFinal =
            custoBase + custoBase * (lucroPercentual / 100);

        return { custoBase, valorFinal };
    };

    const gerarId = () => Date.now() + Math.floor(Math.random() * 1000);

    const onSubmit:SubmitHandler<IForm> = (data) => {
        console.log(data);

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
        historico,
        limparHistorico,
        handleSubmit: handleSubmitHookForm(onSubmit),
        control,
    };
};
