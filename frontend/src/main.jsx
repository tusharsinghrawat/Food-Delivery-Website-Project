import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <BrowserRouter basename="/Food-Delivery-Website-Project">
    <App />
  </BrowserRouter>
);
