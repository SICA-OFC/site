import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import CadastroProfPage from "./pages/CadastroProfPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import EmailLoginConfirmPage from "./pages/EmailLoginConfirmPage.jsx";
import EmailPerfilConfirmPage from "./pages/EmailPerfilConfirmPage.jsx";
import EmailSignConfirmPage from "./pages/EmailSignConfirmPage.jsx";
import BracketPage from "./pages/BracketPage.jsx";
import ModalitiesPage from "./pages/ModalitiesPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_KEY = import.meta.env.VITE_APP_RECAPTCHA_KEY;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <CadastroPage />
      </GoogleReCaptchaProvider>
    ),  },
  {
    path: "/cadastro-professor",
    element: (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <CadastroProfPage />
      </GoogleReCaptchaProvider>
    ),  },
  {
    path: "/login",
    element: (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <LoginPage />
      </GoogleReCaptchaProvider>
    ),
  },
  {
    path: "/confirmacao-login",
    element: <EmailLoginConfirmPage />,
  },
  {
    path: "/confirmacao-perfil",
    element: <EmailPerfilConfirmPage />,
  },
  {
    path: "/confirmacao-cadastro",
    element: <EmailSignConfirmPage />,
  },
  {
    path: "/chaves",
    element: <BracketPage />,
  },
  {
    path: "/modalidades",
    element: <ModalitiesPage />,
  },
  {
    path: "/editar-perfil",
    element: <EditProfilePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
