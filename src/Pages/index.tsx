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
    useTheme,
    InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useIndex } from "./useIndex";
import "../Styles/galaxy.css";
import { useAppThemeContext } from "../Contexts";
import { DarkMode, LightMode, Settings, Save } from "@mui/icons-material";

export const Precificacao3D = () => {
    const {
        openConfig,

        historico,
        limparHistorico,
        handleSubmit,
        control,

        preview,
    } = useIndex();
    const { toggleTheme, themeName } = useAppThemeContext();
    const theme = useTheme();

    return (
        <Container maxWidth="md" className="content-layer">
            <Box py={4}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" color="textPrimary">
                        Precificação 3D
                    </Typography>

                    <Box>
                        <IconButton onClick={openConfig} color="primary">
                            <Settings />
                        </IconButton>

                        <IconButton onClick={toggleTheme} color='inherit'>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: theme.palette.primary.main,
                                    transition: "transform 0.8s ease, opacity 0.4s ease",
                                    transform: `rotate(${themeName === "light" ? 0 : 360}deg)`,
                                    opacity: 1,
                                }}
                            >
                                {themeName === 'light' ? <DarkMode /> : <LightMode />}
                            </Box>
                        </IconButton>
                    </Box>
                </Box>

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
                                                slotProps={{
                                                    input: {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                %
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Embalagem */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name="valorAdicional"
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
                                                label="Valor Adicional"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                R$
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                {preview && (<Grid size={{ xs: 12 }}>

                                    <Card
                                        sx={{
                                            mt: 4,
                                            backdropFilter: "blur(10px)",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Prévia do Cálculo
                                            </Typography>

                                            <Box display="flex" flexDirection="column" gap={1.5}>

                                                {/* Tempo */}
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="body2" color="text.secondary">
                                                        Tempo ({preview.tempoMin} min × R$ {preview.config.custoMinuto.toFixed(2)})
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        R$ {((preview.tempoMin * preview.config.custoMinuto)).toFixed(2)}
                                                    </Typography>
                                                </Box>

                                                {/* Material */}
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="body2" color="text.secondary">
                                                        Material ({preview.peso}g × R$ {(preview.config.custoKG/1000).toFixed(2)})
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        R$ {(preview.peso * (preview.config.custoKG)/1000).toFixed(2)}
                                                    </Typography>
                                                </Box>

                                                {/* Extra */}
                                                {preview.valorAdicional ? (
                                                    <Box display="flex" justifyContent="space-between">
                                                        <Typography variant="body2" color="text.secondary">
                                                            Valor adicional
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            R$ {preview.valorAdicional.toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                ) : null}

                                                <Divider sx={{ my: 1 }} />

                                                {preview.resultado && (
                                                    <>
                                                        {/* Custo base */}
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography fontWeight={600}>
                                                                Custo Base
                                                            </Typography>
                                                            <Typography fontWeight={600}>
                                                                R$ {preview.resultado.custoBase.toFixed(2)}
                                                            </Typography>
                                                        </Box>

                                                        {/* Lucro */}
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography variant="body2" color="text.secondary">
                                                                Lucro ({preview.lucroPercentual}%)
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                + R$ {(preview.resultado.custoBase * (preview.lucroPercentual / 100)).toFixed(2)}
                                                            </Typography>
                                                        </Box>

                                                        <Divider sx={{ my: 1.5 }} />

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
                                                                R$ {preview.resultado.valorFinal.toFixed(2)}
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                )}

                                            </Box>
                                        </CardContent>
                                    </Card>

                                </Grid>)}

                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        startIcon={<Save />}
                                    >
                                        Salvar no Histórico
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
                        <Typography variant="h5" color="textPrimary">
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
