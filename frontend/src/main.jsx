import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataProvider from "../src/context/Datacontext.jsx";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
