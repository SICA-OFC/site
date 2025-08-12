import React, { useState } from "react";
import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import si from "../assets/ConfirmEmailImg.png";
import CodeInput from "../components/codeInput";
import { useNavigate, useLocation } from "react-router-dom";

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
      const cadastroResponse = await fetch(`${BASE_URL}/usuario/verificar`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoverificacao }),
      });

      const cadastroResult = await cadastroResponse.json();

      if (!cadastroResponse.ok) {
        return new Error(
          `Erro ${cadastroResponse.status}: ${JSON.stringify(cadastroResponse)}`
        );
      }

      console.log("Cadastro efetivado com sucesso:", cadastroResult);
      navigate("/");
    } catch (error) {
      console.error("Erro durante a verificação:", error.message);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/ConfirmEmailBG.png')` }}
    >
      <section className="absolute top-[6%] left-[6%] w-[1685px] flex flex-row">
        <div className="flex flex-col justify-center items-center w-[842px] h-[846px] bg-gray-100">
          <div className="absolute top-[5%] left-[3%] flex flex-row justify-between w-[200px]">
            <div className="flex items-center mb-[2px]">
              <img src={logo} alt="Logo SICA" className="w-10 h-10 mr-2" />
            </div>
            <div className="h-px my-1">
              <img src={line} alt="Linha decorativa" />
            </div>
            <h2 className="text-xl font-bold text-[#092843]">Cadastro</h2>
          </div>

          <p className="text-[33px] text-center leading-snug mt-16">
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
            className="flex gap-2 mb-8 border border-[#092843] rounded-lg bg-gray-100 px-4 py-2"
          />

          <input
            type="submit"
            onClick={handleSubmit}
            value="Verificar"
            className="py-2 h-10 w-1/3 bg-[#092843] text-gray-100 rounded-md cursor-pointer text-base hover:bg-gray-100 hover:text-[#001429] hover:border hover:border-[#1f3242] transition duration-300"
          />
        </div>

        <div className="w-[842px] h-[846px] overflow-hidden relative">
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
