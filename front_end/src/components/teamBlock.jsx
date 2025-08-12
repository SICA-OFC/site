import { useRef, useState } from "react";

export default function TeamBlock({ team, image, alt }) {
  const listRef = useRef(null);
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  function toggleList() {
    setOpen(!open);
  }

  return (
    <div className="bg-transparent p-5 rounded-lg w-[400px] m-2 shadow-md">
      <div
        className={`flex items-center cursor-pointer rounded-md transition-all duration-300 border ${
          open ? "rounded-b-none" : ""
        } border-[#dadcde] bg-[#001429] text-[#f5f5f5] hover:text-[#001429] hover:border-[#f18e2c]`}
        onClick={toggleList}
      >
        <div className="flex items-center justify-center px-2 py-4">
          <img className="w-[60px] pb-[10]" src={image} alt={alt} />
        </div>
        <div className="flex items-center justify-end bg-[#f18e2c] px-4 py-2 w-full gap-2 clip-path-custom">
          <h2 className="text-white font-semibold">{team.nome}</h2>
          <div
            ref={arrowRef}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▲
          </div>
        </div>
      </div>

      {open && (
        <div
          ref={listRef}
          className="bg-[#dadcde] px-4 py-3 rounded-b-md transition-all duration-500"
        >
          <div className="bg-[#f5f5f5] p-3 rounded-md">
            <p>Capitão: {team.capitao}</p>
            <p>Integrantes: {team.integrantes.join(", ")}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-[#001429] text-white px-4 py-1 rounded-md border border-[#dadcde] hover:bg-[#dadcde] hover:text-[#001429] hover:border-[#001429] transition-all">
              Editar
            </button>
            <button className="bg-[#f18e2c] text-white px-4 py-1 rounded-md border border-[#dadcde] hover:bg-[#dadcde] hover:text-[#f18e2c] hover:border-[#f18e2c] transition-all">
              Excluir
            </button>
          </div>
        </div>
      )}
    </div> 
  );
}
