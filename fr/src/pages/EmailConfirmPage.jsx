import logo from "../assets/logo.png";
import sideImage from "../assets/ConfirmEmailImg.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CodeInput from "../components/codeInput";
import { VerificarCodigo } from "../hooks/api";

export default function EmailConfirmPage() {
  const [codigoArray, setCodigoArray] = useState(Array(6).fill(""));
  const location = useLocation();
  const { accessToken } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigo_verificacao = codigoArray.join("");
    const result = await VerificarCodigo(codigo_verificacao, accessToken);
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-neutra-branca rounded-md w-[95%] md:w-[85%] h-fit flex flex-row justify-between items-start">
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
