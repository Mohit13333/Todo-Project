import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-3xl font-bold"
      />
    </StrictMode>
  </AuthProvider>
);
