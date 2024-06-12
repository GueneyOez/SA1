// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1DA1F2', // Twitter blue
        },
        secondary: {
            main: '#14171A', // Darker shade for secondary elements
        },
        background: {
            default: '#15202B', // Background color for the entire app
            paper: '#192734', // Background color for cards and paper components
        },
        text: {
            primary: '#FFFFFF', // White text for better readability
            secondary: '#8899A6', // Grey text for secondary information
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
        body1: {
            fontWeight: 400,
        },
        button: {
            textTransform: 'none', // Remove uppercase transformation
        },
    },
});

export default theme;
