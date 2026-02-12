import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useIndex } from "./useIndex";
import "../Styles/galaxy.css";

export const Precificacao3D = () => {
    const { historico, limparHistorico, handleSubmit, control } = useIndex();

    return (
        <Container maxWidth="md" className="content-layer">
            <Box py={4}>
                <Typography variant="h4" color="white">
                    Precificação 3D
                </Typography>

                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="nome"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                type="text"
                                                label="Nome"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Tempo */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="tempoMin"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : Number(e.target.value)
                                                    )
                                                }
                                                value={
                                                    field.value === undefined
                                                        ? ''
                                                        : field.value
                                                }
                                                fullWidth
                                                type="number"
                                                label="Tempo (min)"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                required
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Peso */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="peso"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : Number(e.target.value)
                                                    )
                                                }
                                                value={
                                                    field.value === undefined
                                                        ? ''
                                                        : field.value
                                                }
                                                fullWidth
                                                type="number"
                                                label="Peso (g)"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                required
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Lucro */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="lucroPercentual"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : Number(e.target.value)
                                                    )
                                                }
                                                value={
                                                    field.value === undefined
                                                        ? ''
                                                        : field.value
                                                }
                                                fullWidth
                                                type="number"
                                                label="Lucro (%)"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                required
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Embalagem */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="embalagem"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : Number(e.target.value)
                                                    )
                                                }
                                                value={
                                                    field.value === undefined
                                                        ? ''
                                                        : field.value
                                                }
                                                fullWidth
                                                type="number"
                                                label="Embalagem"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                    >
                                        Calcular e Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <Box mt={5}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h5" color="white">
                            Histórico
                        </Typography>

                        <IconButton onClick={limparHistorico}>
                            <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Box>

                    <Divider sx={{ my: 2, bgcolor: "white" }} />

                    {historico.map((item) => (
                        <Card key={item.id} sx={{ mb: 2 }}>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};
