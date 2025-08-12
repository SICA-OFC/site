import React, { useRef } from "react";

import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import si from "../assets/ConfirmEmailImg.png";

export default function EmailConfirmPage() {
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    if (
      e.target.value.length === e.target.maxLength &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
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
          {/* Logo and header */}
          <div className="flex flex-row justify-between w-[200px] absolute top-[5%] left-[3%]">
            <div className="flex items-center mb-0.5">
              <img src={logo} alt="Logo SICA" className="w-10 h-10 mr-2" />
            </div>
            <div className="h-px my-1.5">
              <img src={line} alt="Linha decorativa" />
            </div>
            <h2 className="text-[#092843] self-center">Perfil</h2>
          </div>

          <p className="text-3xl mb-4 text-center leading-tight">
            Insira o código que foi
            <br />
            enviado para seu email
          </p>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Uma camada a mais de proteção para sua conta!
          </p>

          <div className="flex gap-2 mb-8 border border-[#092843] rounded-lg bg-gray-100 px-2 py-2">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-2xl text-center border-b border-[#092843] bg-gray-100 outline-none"
              />
            ))}
          </div>

          <button
            className="px-4 py-2 h-10 w-1/3 bg-[#092843] text-gray-100 rounded-md cursor-pointer text-base transition-colors duration-300 hover:bg-gray-100 hover:text-[#001429] hover:border hover:border-[#1f3242]"
          >
            Verificar
          </button>
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
