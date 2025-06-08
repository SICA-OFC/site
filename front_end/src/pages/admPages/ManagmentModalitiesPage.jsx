import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ManagmentModalitiesPage.module.scss";

import Futebol from "../../assets/ModalitySoccerImage.png";

import Block from "../../components/modalityBlock.jsx";

import Logo from "../../assets/logo.png";

export default function ManagmentModalitiesPage() {
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

        <div className={styles.gridButtons}>
          <Link style={{ textDecoration: "none" }}>
            <Block alt={"futebol"} image={Futebol} modality={"Futebol"} />
          </Link>

          <Link style={{ textDecoration: "none" }}>
            <div className={styles.addBlock}>
              <div className={styles.plusIcon}>
                <svg
                  width="200px"
                  height="300px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="#f5f5f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2>Adicionar modaliadade</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.buttonsArea}>
          <Link to={"/adm"}>
            <button className={styles.btnVoltar}>Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
