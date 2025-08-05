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

  // Páginas do administrador
  {
    path: "/adm/modalidade",
    element: <AdmHomePage />,
  },
  {
    path: "/adm/modalidade/gerenciar-usuarios",
    element: <ManagmentUsersPage />,
  },
  {
    path: "/adm",
    element: <ManagmentModalityPage />, // Placeholder, replace with actual component
  },
  {
    path: "/adm/modalidade/gerenciar-chaves",
    element: <BracketEditor />,
  },
  {
    path: "/adm/modalidade/gerenciar-times",
    element: <TeamManagement />,
  },
  {
    path: "/adm/modalidade/criar-torneio",
    element: <TournmentCreator />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
