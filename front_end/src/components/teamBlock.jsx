import { useState } from "react";

export default function TeamBlock({ team, image, alt }) {
  const [open, setOpen] = useState(false);

  function toggleList() {
    setOpen(!open);
  }

  return (
    <div className="p-5 rounded-lg w-[400px] m-2.5 bg-transparent">
      <div
        onClick={toggleList}
        className={`flex items-center cursor-pointer rounded-md border border-gray-300 p-2.5 transition-all duration-300
          bg-neutra-preta text-neutra-branca
          ${open ? "rounded-b-none" : ""}
          hover:text-neutra-preta hover:border-destaque`}
      >
        <div className="flex items-center justify-center px-2.5 pb-1.5 pt-5">
          <img className="w-12" src={image} alt={alt} />
        </div>

        <div
          className="flex justify-end items-center bg-destaque px-4 py-2 gap-2 w-full
            clip-path-polygon-[10%_0%,_100%_0%,_100%_100%,_0%_100%]"
        >
          <h2 className="text-neutra-branca">{team.nome}</h2>
          <div
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▲
          </div>
        </div>
      </div>

      {open && (
        <div
          className="bg-gray-300 rounded-b-md rounded-t-none p-2.5 max-h-[500px] opacity-100 transition-all duration-500"
        >
          <div className="bg-neutra-branca rounded-md p-2.5">
            <p>Capitão: {team.capitao}</p>
            <p>Integrantes: {team.integrantes.join(", ")}</p>
          </div>

          <div className="flex justify-between mt-2.5">
            <button
              className="bg-neutra-preta text-white rounded-md px-3 py-1.5 cursor-pointer border border-gray-300
                hover:bg-gray-300 hover:text-neutra-preta hover:border-neutra-preta transition-colors duration-300"
            >
              Editar
            </button>
            <button
              className="bg-destaque text-white rounded-md px-3 py-1.5 cursor-pointer border border-gray-300
                hover:bg-gray-300 hover:text-destaque hover:border-destaque transition-colors duration-300"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
