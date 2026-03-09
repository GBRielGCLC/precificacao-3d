import { Box, Divider, Grid, Typography } from "@mui/material";
import { History } from "@mui/icons-material";
import { HistoricoCard } from "./HistoricoCard";
import { IHistoricoItem } from "../useIndex";
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

            <Grid container spacing={2}>
                {historico.map((item) => {
                    return (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 4
                            }}
                        >
                            <HistoricoCard
                                key={item.id}
                                item={item}
                                onDelete={funcoes?.excluirHistoricoById}
                                onEdit={funcoes?.editarHistorico}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
};