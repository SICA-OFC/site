import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Bounce, toast } from "react-toastify";

export default function ADMHomePage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const fetchedRef = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(false);

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
        if (response.ok && result.usuario.tipo_usuario === "professor") {
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

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundImage: "url('/assets/AdmBG.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#f5f5f5",
      borderRadius: "0.5rem",
      boxShadow: "0 0 30px rgba(0,0,0,0.1)",
      padding: "3%",
      maxWidth: "750px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    logo: {
      width: "10%",
      paddingBottom: "1.25rem",
    },
    divider: {
      borderLeft: "2px solid #0c2442",
      width: "10px",
      height: "50px",
      marginBottom: "1rem",
    },
    headerText: {
      fontSize: "1.125rem",
      fontFamily: "energy",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      width: "100%",
      marginTop: "1rem",
    },
    button: {
      width: "100%",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "1px solid transparent",
      backgroundColor: "#0c2442",
      color: "#f5f5f5",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    buttonHover: {
      backgroundColor: "#f5f5f5",
      color: "#0c2442",
      border: "1px solid #0c2442",
    },
    homeButton: {
      width: "120px",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "1px solid transparent",
      backgroundColor: "#f18e2c",
      color: "#f5f5f5",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    logoutButton: {
      width: "120px",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "1px solid transparent",
      backgroundColor: "red",
      color: "#f5f5f5",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.25rem",
      marginTop: "1rem",
    },
  };

  // Hover state
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <img src={Logo} alt="Imagem do logo" style={styles.logo} />
            <div style={styles.divider}></div>
            <div style={styles.headerText}>
              <h1>Área do Administrador</h1>
            </div>
          </div>
        </div>

        {/* Botões de gerenciamento */}
        <div style={styles.grid}>
          {[
            { text: "Gerenciar Usuários", link: "/adm/modalidade/gerenciar-usuarios" },
            { text: "Gerenciar Times", link: "/adm/modalidade/gerenciar-times" },
            { text: "Gerenciar Torneios", link: "/adm/modalidade/criar-torneio" },
            { text: "Gerenciar Chaves", link: "/adm/modalidade/gerenciar-chaves" },
          ].map((btn, i) => (
            <Link key={i} to={btn.link}>
              <button
                style={hoveredBtn === i ? { ...styles.button, ...styles.buttonHover } : styles.button}
                onMouseEnter={() => setHoveredBtn(i)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {btn.text}
              </button>
            </Link>
          ))}
        </div>

        {/* Botão voltar e logout */}
        <div style={styles.buttonContainer}>
          <Link to="/">
            <button
              style={hoveredBtn === "home" ? { ...styles.homeButton, ...styles.buttonHover } : styles.homeButton}
              onMouseEnter={() => setHoveredBtn("home")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Home
            </button>
          </Link>
          <button
            onClick={handleLogout}
            style={hoveredBtn === "logout" ? { ...styles.logoutButton, ...styles.buttonHover, color: "red" } : styles.logoutButton}
            onMouseEnter={() => setHoveredBtn("logout")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            Deslogar
          </button>
        </div>
      </div>
    </div>
  );
}
