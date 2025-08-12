import React from "react";
import { Link } from "react-router-dom";

import Futebol from "../../assets/ModalitySoccerImage.png";
import Block from "../../components/modalityBlock.jsx";
import Logo from "../../assets/logo.png";

export default function ManagmentModalitiesPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-[#f5f5f5] rounded-md shadow-[0_0_30px_rgba(0,0,0,0.1)] px-[10%] py-[3%] max-w-[1500px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-12 -ml-[550px]">
          <img src={Logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-semibold">Área do Administrador</h2>
        </div>

        {/* Grid de blocos */}
        <div className="grid grid-cols-2 gap-[100px] mb-8">
          <Link to="modalidade" className="no-underline">
            <Block alt="futebol" image={Futebol} modality="Futebol" />
          </Link>

          <Link to="#" className="no-underline">
            <div className="flex flex-col items-center justify-center w-[425px] bg-[#f18e2c] rounded-b-md transition-transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center bg-[#0c24428a] w-full h-[250px]">
                <svg
                  width="200px"
                  height="300px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="#f5f5f5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-center text-white font-semibold py-4">
                <h2>Adicionar modalidade</h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Botão Voltar
        <div className="w-full flex justify-evenly px-[30%] mt-8">
          <Link to="/adm">
            <button className="bg-[#f18e2c] text-[#f5f5f5] py-3 px-6 rounded border border-[#f18e2c] transition-colors duration-300 hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border-[#f18e2c] cursor-pointer">
              Voltar
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
