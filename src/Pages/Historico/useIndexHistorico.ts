import { useMemo, useState } from "react";
import { IHistoricoItem } from "../useIndex";

interface IProps {
    historico: IHistoricoItem[];
}
export const useIndexHistorico = ({ historico }: IProps) => {
    const [busca, setBusca] = useState("");

    const historicoFiltrado = useMemo(() => {
        if (!busca.trim()) return historico;

        return historico.filter((item) =>
            (item.nome ?? "")
                .toLowerCase()
                .includes(busca.toLowerCase())
        );
    }, [historico, busca]);

    return {
        busca,
        setBusca,
        historicoFiltrado
    }
};