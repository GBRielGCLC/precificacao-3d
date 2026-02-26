import { Calculate } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

export const PreviewData = ({ preview }: any) => {
    return (
        <Grid size={{ xs: 12 }}>
            <Card
                sx={{
                    mt: 4,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Calculate />
                        Prévia do Cálculo
                    </Typography>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1.5}
                    >
                        {/* Tempo */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Tempo (
                                {((preview.tempoMin || 0) + (preview.tempoHora * 60 || 0))}{" "}
                                min × R${" "}
                                {preview.config.custoMinuto.toFixed(2)}
                                )
                            </Typography>
                            <Typography variant="body2">
                                R${" "}
                                {preview.resultado?.custoTempo.toFixed(2)}
                            </Typography>
                        </Box>

                        {/* Material */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Material (
                                {preview.peso}g × R${" "}
                                {(
                                    preview.config.custoKG / 1000
                                ).toFixed(2)}
                                )
                            </Typography>
                            <Typography variant="body2">
                                R${" "}
                                {preview.resultado?.custoMaterial.toFixed(2)}
                            </Typography>
                        </Box>

                        {/* Extra */}
                        {preview.valorAdicional ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Valor adicional
                                </Typography>
                                <Typography variant="body2">
                                    R${" "}
                                    {preview.valorAdicional.toFixed(2)}
                                </Typography>
                            </Box>
                        ) : null}

                        <Divider sx={{ my: 1 }} />

                        {preview.resultado && (
                            <>
                                {/* Custo base */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Custo Base
                                    </Typography>
                                    <Typography variant="body2">
                                        R${" "}
                                        {preview.resultado.custoBase.toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Lucro */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Lucro (
                                        {
                                            preview.lucroPercentual
                                        }
                                        %)
                                    </Typography>
                                    <Typography variant="body2">
                                        R${" "}
                                        {preview.resultado.valorPorcentagem.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Divider
                                    sx={{ my: 1.5 }}
                                />

                                {/* Total final */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="h6">
                                        Valor Final
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: 700,
                                        }}
                                    >
                                        R${" "}
                                        {preview.resultado.valorFinal.toFixed(2)}
                                    </Typography>

                                    {!!preview.quantidade &&
                                        preview.quantidade >
                                        1 && (
                                            <>
                                                <Typography variant="h6">
                                                    Valor
                                                    Unidade
                                                </Typography>

                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        color: "primary.main",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    R${" "}
                                                    {preview.resultado.precoUnidade.toFixed(2)}
                                                </Typography>
                                            </>
                                        )}

                                </Box>
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
};
