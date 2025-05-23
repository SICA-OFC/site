import { useRef } from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import ListItem from "./listItem.jsx";
import "./css/header.css";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../components/buttonLogout.jsx";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
      const response = await fetch(`${BASE_URL}/usuario/verificarSessao`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (result.erro) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  const menuRef = useRef(null);

  function AbrirFecharMenu() {
    const menu = menuRef.current;
    if (!menu) return;

    if (menu.classList.contains("menu_fechado")) {
      menu.classList.remove("menu_fechado");
      menu.style.display = "flex";
    } else {
      menu.classList.add("menu_fechado");
      menu.style.display = "none";
    }
  }

  return (
    <header>
      <div id="atalhos">
        <a href="/">
          <img className="logo" src={logo} />
        </a>
        <img src={line} />
        <nav>
          <ul>
            <ListItem href={"/"} texto={"Home"} />
            <ListItem href={"#"} texto={"Equipes"} />
            <ListItem href={"/chaves"} texto={"Chaves"} />
            <ListItem href={"/modalidades"} texto={"Modalidades"} />
          </ul>
        </nav>
      </div>

      <Link to="/login" onClick={handleClick} className="LoginButton">
        <p>Logar</p>
      </Link>

      <button className="ProfileButton" onClick={AbrirFecharMenu}>
        <svg
          className="user-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#f18e2c"
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
          />
        </svg>
      </button>
      <div className="menu menu_fechado" id="menu" ref={menuRef}>
        <Link to="/editar-perfil" className="linkHeader">
          <p>Editar Perfil</p>
        </Link>
        <div className="horizontalLine"></div>
        <LogoutButton />
      </div>
    </header>
  );
}
