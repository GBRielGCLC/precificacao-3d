import { createTheme } from '@mui/material';
import { getBaseTheme } from './Base';

export const DarkTheme = createTheme(getBaseTheme(), {
    palette: {
        mode: 'dark',
        primary: {
            main: '#8b5cf6',
        },
        secondary: {
            main: '#06b6d4',
        },
        background: {
            default: '#090a0f',
            paper: 'rgba(30, 30, 40, 0.75)',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cbd5e1',
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `
            radial-gradient(circle at 20% 30%, rgba(139,92,246,0.25), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2), transparent 40%),
            linear-gradient(135deg, #090a0f 0%, #0f1020 50%, #111827 100%)
          `,
                    backgroundAttachment: 'fixed',
                },

            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(30, 30, 40, 0.7)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                },
            },
        },
    },
});
