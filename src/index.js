import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import ToggleColorModeProv from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleColorModeProv>
      <App />
    </ToggleColorModeProv>
  </React.StrictMode>
);
