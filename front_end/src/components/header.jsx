import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed z-30 w-full bg-white md:backdrop-blur md:bg-white/5 border-b border-white/20">
        <div className="flex items-center justify-between px-10 py-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />

          <div className="hidden md:flex items-center gap-5">
            <nav className="flex gap-8 text-principal font-medium text-lg">
              <Link to="/" className="hover:border-b-2 border-principal transition">Home</Link>
              <Link to="/equipes" className="hover:border-b-2 border-principal transition">Equipes</Link>
              <Link to="/chaves" className="hover:border-b-2 border-principal transition">Chaves</Link>
              <Link to="/modalidades" className="hover:border-b-2 border-principal transition">Modalidades</Link>
            </nav>
          </div>

          <Link to="/login">
            <button className="hidden md:block bg-white text-black w-24 h-12 font-semibold text-xl rounded-lg shadow hover:opacity-90 transition">
              Login
            </button>
          </Link>

          <button
            onClick={handleClick}
            className="z-50 flex md:hidden flex-col justify-center items-center"
          >
            <span className={`bg-principal block h-0.5 w-6 rounded-sm transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`} />
            <span className={`bg-principal block h-0.5 w-6 rounded-sm my-0.5 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`bg-principal block h-0.5 w-6 rounded-sm transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`} />
          </button>
        </div>
      </header>

      <aside className={`fixed z-40 top-15 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex flex-col items-start p-6 space-y-6 text-principal text-xl font-medium">
          <Link to="/" onClick={handleClick}>Home</Link>
          <Link to="/equipes" onClick={handleClick}>Equipes</Link>
          <Link to="/chaves" onClick={handleClick}>Chaves</Link>
          <Link to="/modalidades" onClick={handleClick}>Modalidades</Link>
          <Link to="/login" onClick={handleClick}>
          <Link to="/login">
            <button className="block bg-black text-white w-24 h-12 font-semibold text-xl rounded-lg shadow hover:opacity-90 transition">
              Login
            </button>
          </Link>          </Link>
        </div>
      </aside>
    </>
  );
};

export default Header;
