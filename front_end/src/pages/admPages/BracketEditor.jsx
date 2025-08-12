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
        <div className="flex items-center justify-center mb-12 -ml-[550px]">
          <img src={Logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-semibold">Área do Administrador</h2>
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
              className="bg-[#f18e2c] text-white px-5 py-2 rounded border border-transparent hover:bg-gray-100 hover:text-[#f18e2c] hover:border-[#f18e2c] transition-all duration-300 cursor-pointer"
            >
              Salvar
            </button>
            <Link to="/adm/modalidade" className="no-underline">
              <button className="bg-[#0c2442] text-[#f5f5f5] px-5 py-2 rounded border border-transparent hover:bg-gray-100 hover:text-[#0c2442] hover:border-[#0c2442] transition-all duration-300 cursor-pointer">
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
