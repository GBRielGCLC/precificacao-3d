import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yup } from "../../Yup";
import { useAppConfig } from "../../Contexts";

export interface IFormConfig {
    custoMinuto: number;
    custoGrama: number;
    lucroPadrao: number;
}

const schema = yup.object({
    custoMinuto: yup.number().required().min(0),
    custoGrama: yup.number().required().min(0),
    lucroPadrao: yup.number().required().min(0),
});

const defaultValues: IFormConfig = {
    custoMinuto: 0.05,
    custoGrama: 0.15,
    lucroPadrao: 30,
};

interface Props {
    open: boolean;
    onClose: () => void;
}

export const useConfigDrawer = ({ open, onClose }: Props) => {
    const { config, setConfig } = useAppConfig();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IFormConfig>({
        resolver: yupResolver(schema),
        defaultValues: config,
    });

    useEffect(() => {
        if (open) {
            reset(config);
        }
    }, [open, config, reset]);

    const onSubmit = (data: IFormConfig) => {
        setConfig(data);
        onClose();
    };

    const restaurarPadrao = () => {
        reset(defaultValues);
    };

    return {
        control,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        restaurarPadrao,
    };
};
