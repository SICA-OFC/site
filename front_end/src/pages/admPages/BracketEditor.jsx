import React, { useState } from "react";
import { Link } from "react-router-dom";
import MatchEditor from "../../components/MatchEditor.jsx";
import Logo from "../../assets/logo.png";

const BracketEditor = () => {
  const [matches, setMatches] = useState([
    { team1: "SICA", team2: "Randoms" },
    { team1: "SICA", team2: "Randoms" },
    { team1: "SICA", team2: "" },
  ]);

  const updateMatch = (index, team1, team2) => {
    const updated = [...matches];
    updated[index] = { team1, team2 };
    setMatches(updated);
  };

  const salvar = () => {
    console.log("Chaveamento atualizado:", matches);
    alert("Chaveamento salvo no console!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/assets/AdmBG.png')` }}
    >
      <div className="bg-gray-100 rounded-xl flex flex-col items-center justify-between w-[600px] p-[5%]">
        {/* Header */}
        <div className="w-full flex justify-between mb-10 -mt-8 -ml-24">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Imagem do logo"
              className="w-[10%] pb-10"
            />
            <div className="border-l border-[#0c2442] w-[10px] h-[50px] mb-4"></div>
            <div className="text-[#0c2442]">
              <h1 className="text-xl font-bold">Área do Administrador</h1>
            </div>
          </div>
        </div>

        {/* Match Editors */}
        <div className="flex flex-col items-center w-full">
          {matches.map((match, idx) => (
            <MatchEditor
              key={idx}
              team1={match.team1}
              team2={match.team2}
              onChange={(t1, t2) => updateMatch(idx, t1, t2)}
            />
          ))}

          {/* Botões */}
          <div className="flex flex-row justify-evenly w-full mt-4">
            <button
              onClick={salvar}
              className="bg-[#f18e2c] text-white px-5 py-2 rounded-lg border border-transparent hover:bg-gray-100 hover:text-[#f18e2c] hover:border-[#f18e2c] transition-all duration-300"
            >
              Salvar
            </button>
            <Link to="/adm" className="no-underline">
              <button
                className="bg-[#0c2442] text-[#f5f5f5] px-5 py-2 rounded-lg border border-transparent hover:bg-gray-100 hover:text-[#0c2442] hover:border-[#0c2442] transition-all duration-300"
              >
                Voltar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketEditor;
