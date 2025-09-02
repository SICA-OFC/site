import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";

const Header = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const fetchedRef = useRef(false);
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

  const classToggle = (el, ...args) => args.map((e) => el.classList.toggle(e));
  const handleClick = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("translate-x-0");
      menuRef.current.classList.toggle("translate-x-full");
    }

    if (burgerRef.current) {
      classToggle(
        burgerRef.current.children[0],
        "rotate-45",
        "translate-y-1",
        "-translate-y-0.5"
      );
      classToggle(burgerRef.current.children[1], "opacity-0");
      classToggle(
        burgerRef.current.children[2],
        "-rotate-45",
        "-translate-y-1",
        "translate-y-0.5"
      );
    }
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
        console.log(result);
        if (response.ok) {
          setIsLoggedIn(true);
          if (result.usuario.tipo_usuario == "professor") {
            console.log("admin");
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsLoggedIn(false);
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
        setIsLoggedIn(false);
      } else {
        toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      }
    } catch (err) {
      toast.error("Algo deu errado ao sair! Tente novamente!", toastSettings);
      console.error("Erro no logout:", err);
    }
  };

  const MenuPerfilRef = useRef(null);

  function AbrirFecharMenu() {
    const menu = MenuPerfilRef.current;
    if (!menu) return;

    if (menu.nextSibling.classList.contains("menu")) {
      classToggle(menu.nextSibling, "md:flex", "md:hidden");
    }
  }

  return (
    <>
      <header className="fixed z-30 w-full bg-secundaria md:backdrop-opacity-40 md:bg-secundaria/80 border-b border-secundaria/50 shadow-md p-2">
        <div className="flex items-center justify-between px-10 py-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />

          <div className="hidden md:flex items-center gap-5">
            <nav className="flex gap-8 text-destaque font-medium text-lg">
              <Link
                to="/"
                className="hover:border-b-2 hover:border-primaria transition border-b-2 border-transparent"
              >
                Home
              </Link>
              <Link
                to="/equipes"
                className="hover:border-b-2 border-primaria transition"
              >
                Equipes
              </Link>
              <Link
                to="/chaves"
                className="hover:border-b-2 border-primaria transition"
              >
                Chaves
              </Link>
              <Link
                to="/modalidades"
                className="hover:border-b-2 border-primaria transition"
              >
                Modalidades
              </Link>
            </nav>
          </div>

          {isLoggedIn ? (
            <>
              <button
                ref={MenuPerfilRef}
                onClick={AbrirFecharMenu}
                className="hidden md:flex items-center justify-center border-none hover:cursor-pointer p-0 size-12.5"
              >
                <svg
                  className="w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#f18e2c"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                  />
                </svg>
              </button>
              <div className="menu hidden md:hidden bg-white h-15 w-15 rounded-xl absolute right-11 top-14 flex-col justify-center items-center">
                <Link
                  to="/editar-perfil"
                  className="h-[50%] flex justify-center items-center text-destaque font-semibold"
                >
                  Perfil
                </Link>
                <button
                  className="block bg-black text-white w-15 h-[50%] font-semibold text-sl rounded-lg shadow hover:cursor-pointer hover:outline-blue-700 hover:outline-1 hover:bg-neutra-preta transition"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="hidden md:block bg-destaque text-[#f5f5f5] w-24 h-12 hover:cursor-pointer hover:bg-[#BF6A1F] hover:outline-1 hover:border-destaque font-semibold text-xl rounded-lg shadow transition">
                Login
              </button>
            </Link>
          )}

          <button
            ref={burgerRef}
            onClick={handleClick}
            className="z-50 flex md:hidden flex-col justify-center items-center hover:cursor-pointer"
          >
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm transition-transform duration-300 -translate-y-0.5`}
            />
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm my-0.5 transition-opacity duration-300 opacity-100"
              }`}
            />
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm transition-transform duration-300 translate-y-0.5`}
            />
          </button>
        </div>
      </header>

      <aside
        ref={menuRef}
        className="fixed md:hidden z-40 top-16 right-0 h-full w-55 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col items-start p-6 space-y-6 text-primaria text-xl font-medium">
          <Link to="/" onClick={handleClick}>
            Home
          </Link>
          <Link to="/equipes" onClick={handleClick}>
            Equipes
          </Link>
          <Link to="/chaves" onClick={handleClick}>
            Chaves
          </Link>
          <Link to="/modalidades" onClick={handleClick}>
            Modalidades
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/editar-perfil" onClick={handleClick}>
                <button className="flex items-center gap-3 border-none hover:cursor-pointer">
                  <svg
                    className="size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#f18e2c"
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                    />
                  </svg>
                  Perfil
                </button>
              </Link>
              <button
                className="block bg-black text-white w-24 h-12 font-semibold text-xl rounded-lg shadow hover:cursor-pointer hover:outline-blue-700 hover:outline-1 hover:bg-neutra-preta transition"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" onClick={handleClick}>
              <button className="block bg-black text-white w-24 h-12 font-semibold text-xl rounded-lg shadow hover:cursor-pointer hover:outline-blue-700 hover:outline-1 hover:bg-neutra-preta transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
