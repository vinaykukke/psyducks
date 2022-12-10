import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/InputBase" {
  interface InputBasePropsColorOverrides {
    neutral: true;
  }
}

/** Create a MUI theme instance. */
const theme = createTheme({
  palette: {
    mode: "dark",
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default theme;
