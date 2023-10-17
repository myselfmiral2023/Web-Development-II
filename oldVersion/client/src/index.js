import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProvideAuthProvider } from "./contexts/ProvideAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProvideAuthProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<App/>}/>
          </Routes>
      </AuthContextProvider>
    </ProvideAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
