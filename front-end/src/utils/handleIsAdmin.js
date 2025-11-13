import { toast } from "react-toastify";
import { VerificarUsuário } from "../hooks/api";
import { toastSettings } from "./toastSettings";

export const HandleIsAdmin = async (navigate) => {
      try {
        const result = await VerificarUsuário();

        if (result && result.tipo_usuario === "professor") {
          return true;
        } else {
          toast.warn("Você não é um administrador ou não está logado", toastSettings);
          navigate("/");
          return false; 
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
      }
    };
