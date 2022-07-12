import React from "react";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from "react-redux"

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import store from "./Redux/storage"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
      <App />
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
