import styles from "./TeamManagment.module.scss";
import logo from "../../assets/logo.png";
import TeamBlock from "../../components/teamBlock";

export default function TeamManagement() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <img src={logo} alt="Logo" />
            <div className={styles.verticalLine}></div>
            <div className={styles.text}>
              <h1>Área do Administrador</h1>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h1>Gerenciamento de Equipes</h1>
          <div className={styles.teamList}>
            <TeamBlock
              team={{
                nome: "Equipe A",
                capitão: "Capitão A",
                integrantes: ["Membro 1", "Membro 2"],
              }}
            />
            <TeamBlock
              team={{
                nome: "Equipe B",
                capitão: "Capitão B",
                integrantes: ["Membro 3", "Membro 4"],
              }}
            />
            <TeamBlock
              team={{
                nome: "Equipe C",
                capitão: "Capitão C",
                integrantes: ["Membro 5", "Membro 6"],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
