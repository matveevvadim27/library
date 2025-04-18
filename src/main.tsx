import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </BrowserRouter>
);
