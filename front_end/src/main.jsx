import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import CadastroPage from "./pages/CadastroPage.jsx";
import CadastroProfPage from "./pages/CadastroProfPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import EmailConfirmPage from "./pages/EmailConfirmPage.jsx";
import BracketPage from "./pages/BracketPage.jsx";
import ModalitiesPage from "./pages/ModalitiesPage.jsx";
import HomePage from "./pages/HomePage.jsx";

import AdmHomePage from "./pages/admPages/HomePage.jsx";
import ManagmentUsersPage from "./pages/admPages/ManagementUsersPage.jsx";
import ManagmentModalityPage from "./pages/admPages/ManagementModalitiesPage.jsx";
import BracketEditor from "./pages/admPages/BracketEditor.jsx";
import TeamManagement from "./pages/admPages/TeamManagment.jsx";
import TournmentCreator from "./pages/admPages/TournmentCreator.jsx";
import TournmentsPage from "./pages/admPages/TournmentsPage.jsx";
import ScorePage from "./pages/admPages/ScorePage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // Páginas principais7
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cadastro",
    element: <CadastroPage />,
  },
  {
    path: "/cadastro-professor",
    element: <CadastroProfPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    path: "/adm",
    element: <AdmHomePage />,
  },
  {
    path: "/adm/modalidade/gerenciar-usuarios",
    element: <ManagmentUsersPage />,
  },
  {
    path: "/adm/modalidade",
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
  {
    path: "/adm/modalidade/torneios",
    element: <TournmentsPage />,
  },
  {
    path: "/adm/modalidade/torneios/placar",
    element: <ScorePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
