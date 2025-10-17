import { Link } from "react-router-dom";

function TournmentBlock({ Nome, Time1, Time2, Pontuacao1, Pontuacao2 }) {
  return (
    <Link
      to="/adm/modalidade/torneios/placar"
      className="cursor-pointer hover:scale-105 transition-transform bg-destaque text-neutra-branca p-6 rounded-lg shadow-md w-full text-center flex flex-col gap-4 justify-center align-center"
    >
      <div>
        <h2 className="font-[Energy] text-xl">{Nome}</h2>
        <div className="flex flex-row gap-8 align-center justify-center font-bold">
          <div className="flex flex-row gap-8">
            <h3>{Time1}</h3>
            <h3>{Pontuacao1}</h3>
          </div>
          X
          <div className="flex flex-row gap-8">
            <h3>{Pontuacao2}</h3>
            <h3>{Time2}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TournmentBlock;
