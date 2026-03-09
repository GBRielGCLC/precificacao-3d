import {
    Box,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";

import {
    Delete,
    Edit,
    AccessTime,
    Scale,
    Calculate,
    Percent,
    AddShoppingCart,
    AccountBalanceWallet,
    Category,
} from "@mui/icons-material";

import { IHistoricoItem } from "../useIndex";

interface Props {
    item: IHistoricoItem;

    onDelete?: (id: number) => void;
    onEdit?: (item: IHistoricoItem) => void;
}

export const HistoricoCard = ({ item, onDelete, onEdit }: Props) => {

    const tempoTotal =
        (item.tempoMin || 0) + ((item.tempoHora || 0) * 60);

    const resultado = item.resultado ?? {
        custoTempo: 0,
        custoMaterial: 0,
        custoBase: 0,
        valorFinal: 0,
        valorPorcentagem: 0,
        precoUnidade: 0,
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>

                {/* HEADER */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <Box>
                        <Typography variant="subtitle1">
                            {item.nome || "Sem nome"}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {item.data}
                        </Typography>
                    </Box>

                    <Box display="flex" gap={1}>

                        {onEdit && (
                            <IconButton
                                size="small"
                                onClick={() => onEdit(item)}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        )}

                        {onDelete && (
                            <IconButton
                                size="small"
                                onClick={() => onDelete(item.id)}
                            >
                                <Delete fontSize="small" color="error" />
                            </IconButton>
                        )}

                    </Box>
                </Box>

                <Divider sx={{ mb: 1 }} />

                {/* TEMPO */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                        <AccessTime fontSize="small" />
                        Tempo ({tempoTotal} min)
                    </Typography>

                    <Typography variant="body2">
                        R$ {resultado.custoTempo.toFixed(2)}
                    </Typography>
                </Box>

                {/* MATERIAL */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                        <Scale fontSize="small" />
                        Material ({item.peso}g)
                    </Typography>

                    <Typography variant="body2">
                        R$ {resultado.custoMaterial.toFixed(2)}
                    </Typography>
                </Box>

                {/* EXTRA */}
                {!!item.valorAdicional && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                            <AddShoppingCart fontSize="small" />
                            Valor adicional
                        </Typography>

                        <Typography variant="body2">
                            R$ {item.valorAdicional.toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 1 }} />

                {/* CUSTO BASE */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                        <AccountBalanceWallet fontSize="small" />
                        Custo Base
                    </Typography>

                    <Typography variant="body2">
                        R$ {resultado.custoBase.toFixed(2)}
                    </Typography>
                </Box>

                {/* LUCRO */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                        <Percent fontSize="small" />
                        Lucro ({item.lucroPercentual}%)
                    </Typography>

                    <Typography variant="body2">
                        R$ {resultado.valorPorcentagem.toFixed(2)}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* TOTAL */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                        <Calculate fontSize="small" />
                        Total
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "primary.main",
                            fontWeight: 700,
                        }}
                    >
                        R$ {resultado.valorFinal.toFixed(2)}
                    </Typography>
                </Box>

                {/* VALOR UNIDADE */}
                {item.quantidade > 1 && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={0.5}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                            <Category fontSize="small" />
                            Unidade
                        </Typography>

                        <Typography variant="body2">
                            R$ {resultado.precoUnidade.toFixed(2)}
                        </Typography>
                    </Box>
                )}

            </CardContent>
        </Card>
    );
};