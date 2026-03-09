import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Delete, History } from "@mui/icons-material";
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

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={4}
            >
                <Typography variant="h5" color="textPrimary" sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}>
                    <History />
                    Histórico
                </Typography>

                {funcoes && funcoes.limparHistorico && (
                    <IconButton onClick={funcoes.limparHistorico}>
                        <Delete color="error" />
                    </IconButton>
                )}
            </Box>

            <Divider sx={{ my: 2, bgcolor: "text.primary" }} />

            <Grid container spacing={2}>
                {historico.map((item) => {
                    return (
                        <Grid
                            key={item.id}
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