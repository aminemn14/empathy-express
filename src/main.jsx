import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Summary from "./Summary.jsx";
import { GameProvider } from "./GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  </StrictMode>
);
