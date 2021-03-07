import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#835bb7',
      main: '#674097',
      contrastText: '#fff',
    },
    text: {
      primary: "#fff"
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      contrastText: '#fff',
    },
  },
});

export { theme };
