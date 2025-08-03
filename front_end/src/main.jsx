import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_KEY = import.meta.env.VITE_APP_RECAPTCHA_KEY;
const router = createBrowserRouter([
  {
    path: "/",
    element: < HomePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
