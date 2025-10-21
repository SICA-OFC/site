import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Bounce, toast } from "react-toastify";

export default function ADMHomePage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const fetchedRef = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (fetchedRef.current) return;

    const verificarSessao = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/verificarSessao`, {
          method: "POST",
          credentials: "include",
        });

        const result = await response.json();
        if (response.ok && result.usuario.tipo_usuario == "professor") {
          console.log("admin");
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          toast.warn("Você não é um administrador ou não está logado", toastSettings);
          navigate('/');
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
        setIsLoggedIn(false);
      }
    };
    
    verificarSessao();
    fetchedRef.current = true;
  }, [BASE_URL]);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${BASE_URL}/usuario/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      if (res.ok) {
        toast.success("Você deslogou com sucesso!", toastSettings);
        navigate('/');
      } else {
        toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      }
    } catch (err) {
      toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      console.error("Erro no logout:", err);
    }
  };  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[750px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between ">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Imagem do logo" className="w-[10%] pb-5" />
            <div className="border-l border-neutra-pretaw-[10px] h-[50px] mb-4"></div>
            <div className="text-lg font-[energy]">
              <h1>Área do Administrador</h1>
            </div>
          </div>
        </div>

        {/* Botões de gerenciamento */}
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <Link to="/adm/modalidade/gerenciar-usuarios">
            <button className="w-full bg-neutra-pretatext-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-neutra-pretahover:border hover:border-neutra-pretacursor-pointer">
              Gerenciar Usuários
            </button>
          </Link>

          <Link to="/adm/modalidade/gerenciar-times">
            <button className="w-full bg-neutra-pretatext-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-neutra-pretahover:border hover:border-neutra-pretacursor-pointer">
              Gerenciar Times
            </button>
          </Link>

          <Link to="/adm/modalidade/criar-torneio">
            <button className="w-full bg-neutra-pretatext-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-neutra-pretahover:border hover:border-neutra-pretacursor-pointer">
              Gerenciar Torneios
            </button>
          </Link>
          
          <Link to="/adm/modalidade/gerenciar-chaves">
            <button className="w-full bg-neutra-pretatext-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-neutra-pretahover:border hover:border-neutra-pretacursor-pointer">
              Gerenciar Chaves
            </button>
          </Link>
        </div>

        {/* Botão voltar */}
        <div className="flex flex-row w-full gap-5 mt-4 justify-center items-center">
        <Link to="/">
          <button className="w-30 bg-destaque text-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-destaque hover:border hover:border-destaque cursor-pointer">
            Home
          </button>
        </Link>
          <button onClick={handleLogout} className="w-30 bg-red-500 text-neutra-branca py-3 px-6 border border-transparent rounded transition duration-300 hover:bg-neutra-branca hover:text-red-500 hover:border hover:border-red-500 cursor-pointer">
            Deslogar
          </button>
        </div>
      </div>
    </div>
  );
}
