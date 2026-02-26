import { ReactNode } from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

interface SectionCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export const SectionCard = ({
    title,
    icon,
    children,
}: SectionCardProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        fontWeight: 600,
                    }}
                >
                    {icon}
                    {title}
                </Typography>

                {children}
            </CardContent>
        </Box>
    );
};