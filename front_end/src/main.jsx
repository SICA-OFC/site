import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailLoginConfirmPage from "./pages/EmailLoginConfirmPage.jsx";
import EmailPerfilConfirmPage from "./pages/EmailPerfilConfirmPage.jsx";
import EmailSignConfirmPage from "./pages/EmailSignConfirmPage.jsx";
import BracketPage from "./pages/BracketPage.jsx";
import ModalitiesPage from "./pages/ModalitiesPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: <CadastroPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6Lch7TIrAAAAACwovKu2Vk4Xbqe2TmXdsrrIyn1h">
      <RouterProvider router={router} />
    </GoogleReCaptchaProvider>
  </StrictMode>
);
