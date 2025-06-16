import React, { useState } from "react";
import { Link } from "react-router-dom";
import MatchEditor from "../../components/MatchEditor.jsx";
import styles from "./BracketEditor.module.scss";
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
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <img src={Logo} alt="Imagem do logo" />
            <div className={styles.verticalLine}></div>
            <div className={styles.text}>
              <h1>Area do Administrador</h1>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          {matches.map((match, idx) => (
            <MatchEditor
              key={idx}
              team1={match.team1}
              team2={match.team2}
              onChange={(t1, t2) => updateMatch(idx, t1, t2)}
            />
          ))}
          <div className={styles.buttonsArea}>
            <button onClick={salvar} className={styles.button}>
              Salvar
            </button>
            <Link to={"/adm"} style={{ textDecoration: "none" }}>
              <button className={styles.btnVoltar}>Voltar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketEditor;
