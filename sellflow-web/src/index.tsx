import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { TelegramMiniAppProvider } from "./components/telegram/TelegramMiniAppContext";
import { LanguageProvider } from "./i18n/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <LanguageProvider>
            <TelegramMiniAppProvider>
                <App />
            </TelegramMiniAppProvider>
        </LanguageProvider>
    </BrowserRouter>
);
