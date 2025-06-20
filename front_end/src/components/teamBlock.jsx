import { useRef, useState } from "react";
import "./css/teamBlock.css";

export default function TeamBlock({ team }) {
  const listRef = useRef(null);
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  function toggleList() {
    setOpen(!open);
  }

  return (
    <div className="team_block">
      <div className="header" onClick={toggleList}>
        <h2 className="h2">{team.nome}</h2>
        <div ref={arrowRef} className={`$"arrow" ${open ? "rotate" : ""}`}>
          ▲
        </div>
      </div>

      {open && (
        <div ref={listRef} className="team_info">
          <p>Capitão: {team.capitao}</p>
          <p>Integrantes: {team.integrantes.join(", ")}</p>
        </div>
      )}

      <div className="team_actions">
        <button className="edit_button">Editar</button>
        <button className="delete_button">Excluir</button>
      </div>
    </div>
  );
}
