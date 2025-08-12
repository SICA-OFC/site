import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/verificarSessao`, {
          method: "POST",
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        setIsLoggedIn(result ? true : false);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    verificarSessao();
  }, []);

  return (
    <>
      <header className="fixed z-30 w-full bg-white md:backdrop-blur md:bg-white/5 border-b border-white/20">
        <div className="flex items-center justify-between px-10 py-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />

          <div className="hidden md:flex items-center gap-5">
            <nav className="flex gap-8 text-destaque font-medium text-lg">
              <Link
                to="/"
                className="hover:border-b-2 border-primaria transition"
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
            <Link to="/editar-perfil">
              <button className="hidden md:flex items-center justify-center border-none hover:cursor-pointer p-0 size-12.5">
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
            </Link>
          ) : (
            <Link to="/login">
              <button className="hidden md:block bg-white text-black w-24 h-12 hover:cursor-pointer hover:outline-blue-700 hover:outline-1 hover:bg-neutra-branca font-semibold text-xl rounded-lg shadow transition">
                Login
              </button>
            </Link>
          )}

          <button
            onClick={handleClick}
            className="z-50 flex md:hidden flex-col justify-center items-center hover:cursor-pointer"
          >
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            />
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm my-0.5 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`bg-primaria block h-0.5 w-6 rounded-sm transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            />
          </button>
        </div>
      </header>

      <aside
        className={`fixed md:hidden z-40 top-15 right-0 h-full w-55 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
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
            <Link to="/editar-perfil">
              <button className="flex items-center justify-baseline flex-row border-none hover:cursor-pointer gap-3">
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
          ) : (
            <Link to="/login">
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
