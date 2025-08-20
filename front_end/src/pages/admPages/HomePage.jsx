import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function ADMHomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-[#f5f5f5] rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] px-[10%] py-[3%] max-w-[1000px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between mb-10 -mt-8 -ml-[300px]">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Imagem do logo" className="w-[10%] pb-10" />
            <div className="border-l border-[#0c2442] w-[10px] h-[50px] mb-4"></div>
            <div className="text-lg font-[energy]">
              <h1>Área do Administrador</h1>
            </div>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-[1.875rem] font-[energy] text-[#0c2442] mb-[10%]">
          Olá, Nome do ADM!
        </h1>

        {/* Botões de gerenciamento */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <Link to="/adm/modalidade/gerenciar-chaves">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              Gerenciar Chaves
            </button>
          </Link>

          <Link to="/adm/modalidade/gerenciar-times">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              Gerenciar Times
            </button>
          </Link>

          <Link to="/adm/modalidade/gerenciar-usuarios">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              Gerenciar Usuários
            </button>
          </Link>

          <Link to="/adm/modalidade/criar-torneio">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              Criar Torneios
            </button>
          </Link>
        </div>

        {/* Botão voltar */}
        <Link to="/adm">
          <button className="bg-[#f18e2c] text-[#f5f5f5] py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border hover:border-[#f18e2c] cursor-pointer">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
}
