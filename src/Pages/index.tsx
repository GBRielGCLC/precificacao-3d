import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Typography,
    Divider,
    useTheme,
    InputAdornment,
} from "@mui/material";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useIndex } from "./useIndex";
import "../Styles/galaxy.css";
import { useAppThemeContext } from "../Contexts";
import { DarkMode, LightMode, Settings, Save, Inventory, Scale, AccessTime, PriceChange } from "@mui/icons-material";
import NumericTextField from "../Components/NumericTextField";
import { Historico } from "./Historico";
import { SectionCard } from "../Components/SectionCard";
import { PreviewData } from "./Preview";

export const Precificacao3D = () => {
    const {
        openConfig,

        historico,
        excluirHistoricoById,
        limparHistorico,
        handleSubmit,
        control,

        preview,
    } = useIndex();
    const { toggleTheme, themeName } = useAppThemeContext();
    const theme = useTheme();

    return (
        <Box px={6} py={4}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h2" color="textPrimary">
                    Precificação 3D
                </Typography>

                <Box>
                    <IconButton onClick={openConfig} color="primary">
                        <Settings />
                    </IconButton>

                    <IconButton onClick={toggleTheme} color="inherit">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.primary.main,
                                transition:
                                    "transform 0.8s ease, opacity 0.4s ease",
                                transform: `rotate(${themeName === "light" ? 0 : 360
                                    }deg)`,
                                opacity: 1,
                            }}
                        >
                            {themeName === "light" ? (
                                <DarkMode />
                            ) : (
                                <LightMode />
                            )}
                        </Box>
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={4} sx={{
                alignItems: 'center'
            }}>

                <Grid size={{ xs: 12, sm: 8 }}>
                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container spacing={1}>

                                    <SectionCard title="Detalhes" icon={<Inventory />}>
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
                                        </Grid>
                                    </SectionCard>

                                    <Divider sx={{ my: 2, bgcolor: "white", opacity: "20%", width: "100%" }} />

                                    <SectionCard title="Tempo de Impressão" icon={<AccessTime />}>
                                        <Grid container spacing={2}>
                                            {/* Tempo */}
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name="tempoHora"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <NumericTextField
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            fullWidth
                                                            type="number"
                                                            label="Horas"
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                            decimal
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name="tempoMin"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <NumericTextField
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            fullWidth
                                                            type="number"
                                                            label="Minutos"
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                            required
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                        </Grid>
                                    </SectionCard>

                                    <Divider sx={{ my: 2, bgcolor: "white", opacity: "20%", width: "100%" }} />

                                    <SectionCard title="Material" icon={<Scale />}>
                                        <Grid container spacing={2}>
                                            {/* Peso */}
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name="peso"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <NumericTextField
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            fullWidth
                                                            type="number"
                                                            label="Peso (g)"
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                            required
                                                            decimal
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            {/* quantidade */}
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name="quantidade"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <NumericTextField
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            label="Quantidade"
                                                            fullWidth
                                                            required
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <Divider sx={{ my: 2, bgcolor: "white", opacity: "20%", width: "100%" }} />

                                    <SectionCard title="Extra" icon={<PriceChange />}>
                                        <Grid container spacing={2}>

                                            {/* Lucro */}
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name="lucroPercentual"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <NumericTextField
                                                            {...field}
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
                                                        <NumericTextField
                                                            {...field}
                                                            fullWidth
                                                            type="number"
                                                            label="Valor Adicional"
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                            decimal
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

                                        </Grid>
                                    </SectionCard>

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
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <PreviewData preview={preview} />
                </Grid>
            </Grid>

            <Historico historico={historico} funcoes={{ limparHistorico, excluirHistoricoById }} />
        </Box>
    );
};
