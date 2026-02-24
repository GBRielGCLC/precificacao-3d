import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type NumericTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
    onChange?: (value: number | undefined) => void;
};

const NumericTextField = ({ onChange, onKeyDown, ...props }: NumericTextFieldProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const stringValue = e.target.value;

        if (stringValue === "") {
            onChange?.(undefined);
            return;
        }

        // Remove qualquer caractere que não seja dígito (previne colagem de texto inválido)
        const cleanValue = stringValue.replace(/\D/g, '');

        // Se após a limpeza o valor for diferente do original (tinha ponto/vírgula), 
        // ou se for um número válido, atualizamos o estado.
        if (cleanValue !== "") {
            onChange?.(Number(cleanValue));
        } else {
            onChange?.(undefined);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Bloqueia: sinais (+, -), notação científica (e), e separadores decimais (., ,)
        if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
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
            inputProps={{
                min: 0,
                step: 1, // Indica que o incremento deve ser de 1 em 1
                inputMode: 'numeric',
                pattern: '[0-9]*',
                ...props.inputProps,
            }}
        />
    );
};

export default NumericTextField;