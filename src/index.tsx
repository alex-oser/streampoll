import ReactDOM from "react-dom";
import App from "./App";
import { Store } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { GlobalStyle } from "./style";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Store>
      <>
        <App />
        <GlobalStyle />
        <CssBaseline />
      </>
    </Store>
  </ThemeProvider>,
  document.getElementById("root")
);
