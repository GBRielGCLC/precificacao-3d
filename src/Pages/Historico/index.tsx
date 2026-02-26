import { Box, Card, CardContent, Divider, IconButton, Typography } from "@mui/material";
import { IHistoricoItem } from "../useIndex";
import DeleteIcon from "@mui/icons-material/Delete";
import { History } from "@mui/icons-material";

interface IHistoricoProps {
    historico: IHistoricoItem[]
    funcoes?: {
        limparHistorico?: () => void
        excluirHistoricoById?: (id: number) => void
    }
}
export const Historico = ({ historico, funcoes }: IHistoricoProps) => {
    return (
        <Box mt={5}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                        <DeleteIcon sx={{ color: "white" }} />
                    </IconButton>
                )}
            </Box>

            <Divider sx={{ my: 2, bgcolor: "white" }} />

            {historico.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Box display='flex' justifyContent='space-between' alignItems='center' >
                            <Box>
                                <Typography variant="subtitle1">
                                    {item.nome || "Sem nome"}
                                </Typography>

                                <Typography variant="body2">
                                    Custo Base: R$ {item.custoBase.toFixed(2)}
                                </Typography>

                                <Typography variant="body2">
                                    Valor Final: R$ {item.valorFinal.toFixed(2)}
                                </Typography>

                                <Typography variant="caption">
                                    {item.data}
                                </Typography>
                            </Box>

                            {funcoes?.excluirHistoricoById && (
                                <IconButton
                                    size="small"
                                    onClick={() => funcoes.excluirHistoricoById?.(item.id)}
                                >
                                    <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};
