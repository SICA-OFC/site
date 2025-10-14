import logo from "../assets/logo.png";
import sideImage from "../assets/ConfirmEmailImg.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import CodeInput from "../components/codeInput";
const toastSettings = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

export default function EmailConfirmPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [codigoArray, setCodigoArray] = useState(Array(6).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const codigo_verificacao = codigoArray.join("");
      console.log(accessToken);
      const loginResponse = await fetch(`${BASE_URL}/usuario/verificar`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo_verificacao }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(
          `Erro ${loginResponse.status}: ${
            errorData.erro || "Falha na verificação"
          }`
        );
      }

      toast.success("Autenticação bem sucedida!", toastSettings);
      navigate("/");
    } catch (error) {
      toast.error(error.message, toastSettings);
      console.error("Erro durante a verificação:", error.message);
    }
  };
  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-neutra-branca rounded-md w-[70%] h-fit flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 h-full w-full md:w-[50%] p-6">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Verificação</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-5 w-full h-full"
          >
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-3xl">
                Insira o código que foi
                <br />
                enviado para seu email
              </p>
              <p className="text-sm text-[#828282]">
                Uma camada a mais de proteção para sua conta!
              </p>
            </div>
            <CodeInput
              value={codigoArray}
              onChange={setCodigoArray}
              className="flex border-1 border-neutra-preta rounded-sm gap-2 w-fit h-fit px-3 py-2"
            />
            <div className="flex flex-col items-center gap-2 w-full">
              <button
                onClick={handleSubmit}
                className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-[40%] hover:bg-neutra-branca hover:text-neutra-preta hover:border-secundaria hover:border-1 hover:cursor-pointer transition"
                type="submit"
                name="submit"
                value="login"
              >
                Verificar
              </button>

              <div className="flex flex-col items-center justify-center w-full">
                <span className="text-primaria text-sm text-center w-full hover:cursor-pointer">
                  Reenviar Email
                </span>
              </div>
            </div>
          </form>
        </div>
        <img
          src={sideImage}
          className="hidden md:block w-[50%] h-full rounded-r-md"
        />
      </div>
    </div>
  );
}
