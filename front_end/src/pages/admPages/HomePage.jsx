import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

import Logo from "../../assets/logo.png";

export default function ADMHomePage() {
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

        <h1 className={styles.title}>Olá, Nome do ADM!</h1>

        <div className={styles.gridButtons}>
          <Link to={"/adm/gerenciar-chaves"}>
            <button className={styles.button}>GERENCIAR CHAVES</button>
          </Link>
          <Link to={"/adm/gerenciar-modalidades"}>
            <button className={styles.button}>GERENCIAR MODALIDADES</button>
          </Link>
          <Link>
            <button className={styles.button}>GERENCIAR TIMES</button>
          </Link>
          <Link to={"/adm/gerenciar-usuarios"}>
            <button className={styles.button}>GERENCIAR USUÁRIOS</button>
          </Link>
        </div>

        <Link>
          <button className={styles.mainButton}>CRIAR TORNEIO</button>
        </Link>
      </div>
    </div>
  );
}
