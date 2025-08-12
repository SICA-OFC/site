import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailConfirmPage from "./pages/EmailConfirmPage.jsx";
import BracketPage from "./pages/BracketPage.jsx";
import ModalitiesPage from "./pages/ModalitiesPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import AdmHomePage from "./pages/admPages/HomePage.jsx";
import ManagementUsersPage from "./pages/admPages/ManagementUsersPage.jsx"; 
import ManagementModalityPage from "./pages/admPages/ManagementModalitiesPage.jsx";
import BracketEditorPage from "./pages/admPages/BracketEditorPage.jsx";
// import TeamManagementPage from "./pages/admPages/TeamManagement.jsx";

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
    path: "/confirmacao",
    element: <EmailConfirmPage />,
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
    element: <ManagementUsersPage />,
  },
  {
    path: "/adm",
    element: <ManagementModalityPage />, // Placeholder, replace with actual component
  },
  {
    path: "/adm/modalidade/gerenciar-chaves",
    element: <BracketEditorPage />,
  },
  // {
  //   path: "/adm/modalidade/gerenciar-times",
  //   element: <TeamManagementPage />,
  // },
  // {
  //   path: "/adm/modalidade/criar-torneio",
  //   element: <TournmentCreatorPage />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
