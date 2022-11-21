import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./Store";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
