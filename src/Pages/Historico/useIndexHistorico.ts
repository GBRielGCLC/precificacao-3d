import { useMemo, useState } from "react";
import { IHistoricoItem } from "../useIndex";

interface IProps {
    historico: IHistoricoItem[];
}

const removerAcentos = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const useIndexHistorico = ({ historico }: IProps) => {
    const [busca, setBusca] = useState("");

    const historicoFiltrado = useMemo(() => {
        if (!busca.trim()) return historico;

        const buscaNormalizada = removerAcentos(busca.toLowerCase());

        return historico.filter((item) =>
            removerAcentos((item.nome ?? "").toLowerCase()).includes(buscaNormalizada)
        );
    }, [historico, busca]);

    return {
        busca,
        setBusca,
        historicoFiltrado
    }
};