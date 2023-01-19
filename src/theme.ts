import { createTheme } from "@mui/material/styles"

declare module '@mui/material/styles' {
    interface TypographyVariants {
        footer: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        footer?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        footer: true;
    }
}

// Define a theme
// Use theme color names as needed - not what I would do in a real application
export const theme = createTheme({
    palette: {
        primary: {
            light: "#ffe300",
            main: "#F0E1F6",
            dark: "#005db0",
            contrastText: "#000",
        },
        secondary: {
            main: "#FFFFFF",
            light: "#BB2649",
            dark: "#2E2F38",
            contrastText: "#000",
        },
    },
})
