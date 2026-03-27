import {
    Drawer,
    Box,
    Typography,
    Divider,
    Button,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useConfigDrawer } from "./useConfigDrawer";
import NumericTextField from "../NumericTextField";

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
                        <NumericTextField
                            {...field}
                            type="number"
                            decimal
                            label="Custo por Minuto (R$)"
                            error={!!errors.custoMinuto}
                            helperText={errors.custoMinuto?.message}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="custoKG"
                    control={control}
                    render={({ field }) => (
                        <NumericTextField
                            {...field}
                            decimal
                            type="number"
                            label="Preço do KG"
                            error={!!errors.custoKG}
                            helperText={errors.custoKG?.message}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="enviarComEnter"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel control={<Switch
                            checked={!!field.value} // Usa 'checked' em vez de 'value' e garante que é booleano
                            onChange={field.onChange} />
                        } label="Enviar com enter" />
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