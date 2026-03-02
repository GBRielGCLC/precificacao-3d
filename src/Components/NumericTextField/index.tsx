import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type NumericTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
    onChange?: (value: number | undefined) => void;
    maxValue?: number;
    minValue?: number;
    decimal?: boolean;
};

const NumericTextField = ({ onChange, onKeyDown, maxValue, minValue = 0, decimal = false, ...props }: NumericTextFieldProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const stringValue = e.target.value;

        if (stringValue === "") {
            onChange?.(undefined);
            return;
        }

        const regex = decimal ? /[^0-9.,]/g : /\D/g;
        // Remove qualquer caractere que não seja dígito (previne colagem de texto inválido)
        const cleanValue = stringValue.replace(regex, '');

        // Se após a limpeza o valor for diferente do original (tinha ponto/vírgula), 
        // ou se for um número válido, atualizamos o estado.
        if (!!cleanValue && cleanValue !== "") {
            let transformedValue = Number(cleanValue);
            if (!!maxValue && transformedValue > maxValue) {
                transformedValue = maxValue;
            } else if (!!minValue && transformedValue < minValue) {
                transformedValue = minValue;
            }

            onChange?.(transformedValue);
        } else {
            onChange?.(undefined);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Bloqueia: sinais (+, -), notação científica (e), e separadores decimais (., ,)
        if (["-", "+", "e", "E",
            ...(decimal ? [] : [".", ","])
        ].includes(e.key)) {
            e.preventDefault();
        }
        onKeyDown?.(e);
    };

    return (
        <TextField
            {...props}
            type="number"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            slotProps={{
                ...props.slotProps,
                htmlInput: {
                    min: minValue,
                    max: maxValue,
                    step: 1,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    ...(props.slotProps?.htmlInput || {}),
                },
            }}
        />
    );
};

export default NumericTextField;