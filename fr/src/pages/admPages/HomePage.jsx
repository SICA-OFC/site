import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { toastSettings } from "../../utils/toastSettings";
import { BASE_URL } from "../../utils/enviromentSettings";

export default function ADMHomePage() {
  const fetchedRef = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(false);

  useEffect(() => {
    if (fetchedRef.current) return;

    const verificarSessao = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/verificarSessao`, {
          method: "POST",
          credentials: "include",
        });

        const result = await response.json();
        if (response.ok && result.usuario.tipo_usuario === "professor") {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          toast.warn("Você não é um administrador ou não está logado", toastSettings);
          navigate("/");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
        setIsLoggedIn(false);
      }
    };

    verificarSessao();
    fetchedRef.current = true;
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/usuario/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Você deslogou com sucesso!", toastSettings);
        navigate("/");
      } else {
        toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      }
    } catch (err) {
      toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      console.error("Erro no logout:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/AdmBG.png')] bg-cover bg-center flex justify-center items-center">
      <div className="bg-neutra-branca rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[750px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[10%] pb-5" />
            <div className="border-l-2 border-neutra-pretaw-[10px] h-[50px] mb-4"></div>
            <h1 className="text-lg font-[energy]">Área do Administrador</h1>
          </div>
        </div>

        {/* Botões de gerenciamento */}
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          {[
            { text: "Gerenciar Usuários", link: "/adm/modalidade/gerenciar-usuarios" },
            { text: "Gerenciar Times", link: "/adm/modalidade/gerenciar-times" },
            { text: "Gerenciar Torneios", link: "/adm/modalidade/criar-torneio" },
            { text: "Gerenciar Chaves", link: "/adm/modalidade/gerenciar-chaves" },
          ].map((btn, i) => (
            <Link key={i} to={btn.link}>
              <button className="w-full px-6 py-3 rounded-md border border-transparent bg-neutra-preta text-neutra-branca cursor-pointer transition-all duration-300 hover:bg-neutra-branca hover:text-neutra-preta hover:border-[#0c2442]">
                {btn.text}
              </button>
            </Link>
          ))}
        </div>

        {/* Botão voltar e logout */}
        <div className="flex justify-center items-center gap-5 mt-4">
          <Link to="/">
            <button className="w-[120px] px-6 py-3 rounded-md border border-transparent bg-destaque text-neutra-branca cursor-pointer transition-all duration-300 hover:bg-neutra-branca hover:text-destaque hover:border-destaque">
              Home
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-[120px] px-6 py-3 rounded-md border border-transparent bg-[red] text-neutra-branca cursor-pointer transition-all duration-300 hover:bg-neutra-branca hover:text-[red] hover:border-[red]"
          >
            Deslogar
          </button>
        </div>
      </div>
    </div>
  );
}
