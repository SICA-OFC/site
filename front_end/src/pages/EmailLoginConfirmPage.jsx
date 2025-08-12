import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import si from "../assets/ConfirmEmailImg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CodeInput from "../components/codeInput";

export default function EmailConfirmPage() {
  const navigate = useNavigate();
  const [codigoArray, setCodigoArray] = useState(Array(6).fill(""));
  const location = useLocation();
  const { accessToken } = location.state || {};

  const handleSubmit = async (e) => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    e.preventDefault();

    try {
      const codigoverificacao = codigoArray.join("");
      console.log(accessToken);
      const loginResponse = await fetch(`${BASE_URL}/usuario/verificar`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoverificacao }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(
          `Erro ${loginResponse.status}: ${
            errorData.erro || "Falha na verificação"
          }`
        );
      }

      const loginResult = await loginResponse.json();
      console.log("login efetivado com sucesso", loginResult);
      navigate("/");
    } catch (error) {
      console.error("Erro durante a verificação:", error.message);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover"
      style={{ backgroundImage: 'url("../assets/ConfirmEmailBG.png")' }}
    >
      <section className="flex flex-row w-[1685px] absolute top-[6%] left-[6%]">
        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-[842px] h-[846px] bg-gray-100 relative">
          <div className="flex flex-row justify-between w-[200px] absolute top-[5%] left-[3%]">
            <div className="flex items-center mb-0.5">
              <img src={logo} alt="Logo SICA" className="w-10 h-10 mr-2" />
            </div>
            <div className="h-px my-1.5">
              <img src={line} alt="Linha decorativa" />
            </div>
            <h2 className="text-[#092843] self-center">Login</h2>
          </div>

          <p className="text-3xl mb-4 text-center leading-tight">
            Insira o código que foi
            <br />
            enviado para seu email
          </p>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Uma camada a mais de proteção para sua conta!
          </p>

          <CodeInput
            value={codigoArray}
            onChange={setCodigoArray}
            className="flex gap-2 mb-8 border border-[#092843] rounded-lg"
          />

          <input
            type="submit"
            onClick={handleSubmit}
            value="Verificar"
            className="px-4 py-2 h-10 w-1/3 bg-[#092843] text-gray-100 rounded-md cursor-pointer text-base transition-colors duration-300 hover:bg-gray-100 hover:text-[#001429] hover:border hover:border-[#1f3242]"
          />
        </div>

        {/* Image Section */}
        <div className="flex-1 overflow-hidden relative w-[842px] h-[846px]">
          <img
            src={si}
            alt="Imagem de proteção"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
