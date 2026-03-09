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
    data: Date;
}

const STORAGE_KEY = "precificacao_3d_historico";
const DEFAULT_LUCRO = 100;

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
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            lucroPercentual: DEFAULT_LUCRO,
            valorAdicional: undefined,
            peso: undefined,
            quantidade: undefined,
            nome: "",
            tempoMin: undefined,
            tempoHora: undefined,
        },
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

    const excluirHistoricoById = (id: number) => {
        const newHistorico = historico.filter((item) => item.id !== id);

        setHistorico(newHistorico);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistorico));
    }

    const limparHistorico = () => {
        setHistorico([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const [dataEdit, setDataEdit] = useState<IHistoricoItem>();
    const editarHistorico = (item: IHistoricoItem) => {
        setDataEdit(item);

        reset({
            nome: item.nome,
            tempoHora: item.tempoHora,
            tempoMin: item.tempoMin,
            peso: item.peso,
            quantidade: item.quantidade,
            lucroPercentual: item.lucroPercentual,
            valorAdicional: item.valorAdicional,
        }, { keepDefaultValues: true });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const resetForm = () => {
        setDataEdit(undefined);
        reset();
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

        if (dataEdit) {
            const atualizado: IHistoricoItem = {
                ...dataEdit,
                ...data,
                data: new Date(),
                valorAdicional: data.valorAdicional ?? 0,
                resultado: preview,
            };

            const novoHistorico = historico.map((item) =>
                item.id === dataEdit.id ? atualizado : item
            );

            // Ordenando por mais recente
            novoHistorico.sort(
                (a: IHistoricoItem, b: IHistoricoItem) =>
                    new Date(b.data).getTime() - new Date(a.data).getTime()
            );

            setHistorico(novoHistorico);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(novoHistorico));
        } else {
            salvarHistorico({
                id: gerarId(),
                data: new Date(),
                valorAdicional: data.valorAdicional ?? 0,
                resultado: preview,
                ...data,
            });
        }

        resetForm();
    };

    return {
        openConfig,

        historico,
        funcoesHistorico: {
            excluirHistoricoById,
            limparHistorico,
            editarHistorico
        },
        dataEdit,

        //@ts-expect-error
        handleSubmit: handleSubmitHookForm(onSubmit),
        control,
        resetForm,

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
