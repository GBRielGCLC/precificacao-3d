import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yup } from "../../Yup";
import { useAppConfig } from "../../Contexts";
import { defaultConfig as defaultValues } from "../../Contexts";

export interface IFormConfig {
    custoMinuto: number;
    custoKG: number;
}

const schema = yup.object({
    custoMinuto: yup.number().required().min(0),
    custoKG: yup.number().required().min(0),
});

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
