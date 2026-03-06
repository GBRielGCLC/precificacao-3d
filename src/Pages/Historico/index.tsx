import { Box, Divider, Typography } from "@mui/material";
import { History } from "@mui/icons-material";
import { HistoricoCard } from "./HistoricoCard";
import { IHistoricoItem } from "../useIndex";
import { calcularPreco3d } from "../../Services/Calculo";

interface Props {
    historico: IHistoricoItem[];

    funcoes?: {
        limparHistorico?: () => void;
        excluirHistoricoById?: (id: number) => void;
        editarHistorico?: (item: IHistoricoItem) => void;
    };
}

export const Historico = ({ historico, funcoes }: Props) => {

    return (
        <Box mt={5}>

            <Typography
                variant="h5"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <History />
                Histórico
            </Typography>

            <Divider sx={{ my: 2 }} />

            {historico.map((item) => {
                const resultado = calcularPreco3d(item);

                return (
                    <HistoricoCard
                        key={item.id}
                        item={item}
                        onDelete={funcoes?.excluirHistoricoById}
                        onEdit={funcoes?.editarHistorico}
                    />
                )
            })}
        </Box>
    );
};