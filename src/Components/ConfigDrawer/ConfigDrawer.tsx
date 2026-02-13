import {
    Drawer,
    Box,
    Typography,
    Divider,
    TextField,
    Button,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useConfigDrawer } from "./useConfigDrawer";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const ConfigDrawer = ({ open, onClose }: Props) => {
    const {
        control,
        errors,
        handleSubmit,
    } = useConfigDrawer({ open, onClose });

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 320,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                }}

                component="form"
                noValidate
            >
                <Typography variant="h6">
                    Configurações
                </Typography>

                <Divider />

                <Controller
                    name="custoMinuto"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Custo por Minuto (R$)"
                            error={!!errors.custoMinuto}
                            helperText={errors.custoMinuto?.message}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="custoGrama"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Custo por Grama (R$)"
                            error={!!errors.custoGrama}
                            helperText={errors.custoGrama?.message}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="lucroPadrao"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Lucro Padrão (%)"
                            error={!!errors.lucroPadrao}
                            helperText={errors.lucroPadrao?.message}
                            fullWidth
                        />
                    )}
                />

                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Salvar
                </Button>
            </Box>
        </Drawer>
    );
};