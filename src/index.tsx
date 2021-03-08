import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Store } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Store>
      <App />
    </Store>
  </ThemeProvider>,
  document.getElementById("root")
);
