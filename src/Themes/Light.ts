import { createTheme } from '@mui/material';
import { getBaseTheme } from './Base';

export const LightTheme = createTheme(getBaseTheme(), {
    palette: {
        mode: 'light',
        primary: {
            main: '#8b5cf6',
        },
        secondary: {
            main: '#06b6d4',
        },
        background: {
            default: '#f8fafc',
            paper: 'rgba(255,255,255,0.8)',
        },
        text: {
            primary: '#0f172a',
            secondary: '#334155',
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `
            radial-gradient(circle at 20% 30%, rgba(139,92,246,0.15), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.15), transparent 40%),
            linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
          `,
                    backgroundAttachment: 'fixed',
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});
