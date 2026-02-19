import React from "react";
console.log("Main.jsx is executing...");
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
