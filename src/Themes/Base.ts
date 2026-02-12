import { ThemeOptions } from '@mui/material';

export const getBaseTheme = (): ThemeOptions => ({
    typography: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 500 },
        h2: { fontSize: '1.5rem', fontWeight: 500 },
        h3: { fontSize: '1.25rem', fontWeight: 500 },
        h4: { fontSize: '1rem', fontWeight: 500 },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    minHeight: '100vh',
                    transition: 'background 0.3s ease',
                },
            },
        },

        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#d32f2f',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 12,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(12px)',
                },
            },
        },
    },
});
