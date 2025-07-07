import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";  // ✅ use the new react import

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics /> {/* ✅ this tracks all page views */}
    </BrowserRouter>
  </React.StrictMode>
);
