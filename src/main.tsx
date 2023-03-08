import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { ColorModeProvider } from "./context/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </React.StrictMode>
);
