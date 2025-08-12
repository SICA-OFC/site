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
        <div className="flex items-center justify-center mb-12 -ml-[550px]">
          <img src={Logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-semibold">Área do Administrador</h2>
        </div>

        {/* Título */}
        <h1 className="text-[1.875rem] font-semibold text-[#0c2442] mb-[10%]">
          Olá, Nome do ADM!
        </h1>

        {/* Botões de gerenciamento */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <Link to="/adm/modalidade/gerenciar-chaves">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              GERENCIAR CHAVES
            </button>
          </Link>

          <Link to="/adm/modalidade/gerenciar-times">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              GERENCIAR TIMES
            </button>
          </Link>

          <Link to="/adm/modalidade/gerenciar-usuarios">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              GERENCIAR USUÁRIOS
            </button>
          </Link>

          <Link to="/adm/modalidade/criar-torneio">
            <button className="w-full bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] transition duration-300 hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border hover:border-[#0c2442] cursor-pointer">
              CRIAR TORNEIO
            </button>
          </Link>
        </div>

        {/* Botão voltar */}
        <Link to="/adm">
          <button className="bg-[#f18e2c] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] transition duration-300 hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border hover:border-[#f18e2c] cursor-pointer">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
}
