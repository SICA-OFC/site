import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_KEY = import.meta.env.VITE_APP_RECAPTCHA_KEY;
const router = createBrowserRouter([
  {
    path: "/",
    element: < HomePage />,
  },
  {
    path: "/cadastro",
    element: (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <CadastroPage />
      </GoogleReCaptchaProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <LoginPage />
      </GoogleReCaptchaProvider>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
