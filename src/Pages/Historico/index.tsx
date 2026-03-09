import { Box, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Close, Delete, History, Search } from "@mui/icons-material";
import { HistoricoCard } from "./HistoricoCard";
import { IHistoricoItem } from "../useIndex";
import { useIndexHistorico } from "./useIndexHistorico";
interface Props {
    historico: IHistoricoItem[];

    funcoes?: {
        limparHistorico?: () => void;
        excluirHistoricoById?: (id: number) => void;
        editarHistorico?: (item: IHistoricoItem) => void;
    };
}

export const Historico = ({ historico, funcoes }: Props) => {
    const { busca, setBusca, historicoFiltrado } = useIndexHistorico({ historico });


    return (
        <Box mt={5}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={4}
            >
                {/* LADO ESQUERDO: Título */}
                <Typography
                    variant="h5"
                    color="textPrimary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <History />
                    Histórico
                </Typography>

                {/* LADO DIREITO: Busca + Lixeira */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <TextField
                        size="small"
                        variant="filled"
                        label="Pesquisar por nome"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {busca ? (
                                            <IconButton
                                                size="small"
                                                onClick={() => setBusca("")}
                                            >
                                                <Close fontSize="small" color="error" />
                                            </IconButton>
                                        ) : (
                                            <Search fontSize="small" color="primary" />
                                        )}
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {funcoes?.limparHistorico && (
                        <IconButton onClick={funcoes.limparHistorico}>
                            <Delete color="error" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 2, bgcolor: "text.primary" }} />

            <Grid container spacing={2}>
                {historicoFiltrado.map((item) => {
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