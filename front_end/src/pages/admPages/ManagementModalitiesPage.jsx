import React from "react";
import { Link } from "react-router-dom";

import Futebol from "../../assets/ModalitySoccerImage.png";
import Block from "../../components/modalityBlock.jsx";
import Logo from "../../assets/logo.png";

export default function ManagementModalitiesPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-neutra-branca rounded-md shadow-[0_0_30px_rgba(0,0,0,0.1)] px-[10%] py-[3%] max-w-[1500px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between mb-10 -mt-8 -ml-[300px]">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Imagem do logo" className="w-[10%] pb-10" />
            <div className="border-l border-neutra-pretaw-[10px] h-[50px] mb-4"></div>
            <div className="font-[energy] text-[#0c2442]">
              <h1>Área do Administrador</h1>
            </div>
          </div>
        </div>

        {/* Grid de blocos */}
        <div className="grid grid-cols-2 gap-[100px] mb-8">
          <Link to="modalidade" className="no-underline">
            <Block alt="futebol" image={Futebol} modality="Futebol" />
          </Link>

          <Link to="#" className="no-underline">
            <div className="flex flex-col items-center justify-center w-[425px] bg-destaque rounded-b-md transition-transform duration-300 hover:scale-105">
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
              <div className="text-center text-white font-[energy] py-2">
                <h2>Adicionar modalidade</h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Botão Voltar */}
        {/* <div className="w-full flex justify-evenly px-[30%] mt-8">
          <Link to="/adm">
            <button className="bg-destaque  text-neutra-branca py-3 px-6 rounded-md border border-destaque transition-colors duration-300 hover:bg-neutra-branca hover:text-destaque hover:border-destaque cursor-pointer">
              Voltar
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
