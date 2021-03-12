import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  spacing: 0,
  palette: {
    type: "dark",
    error: {
      main: "#f44336"
    },
    primary: {
      light: "#835bb7",
      main: "#674097",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#3c3c3c",
      contrastText: "#000",
    },
  },
});

export { theme };
