import React from "react";
import { Link } from "react-router-dom";
import styles from "./ManagmentUsersPage.module.scss";

import Logo from "../../assets/logo.png";
import ProfilePhotoUploader from "../../components/profilePhotoUploader.jsx";
import genericProfilePhoto from "../../assets/genericProfilePhoto.png";

function ClickableUserEntry({ name, rm, course, modality }) {
  return (
    <p className={styles.usersEntry}>
      <span className={styles.highlight}>
        {name} | {rm} | {course} | {modality}
      </span>
    </p>
  );
}

export default function ManagmentUsersPage() {
  const users = Array(12)
    .fill(0)
    .map((_, i) => ({
      name: `Fulano ${i + 1}`,
      rm: 33197 + i,
      course: "Mecanica",
      modality: "Futebol",
      categoria: "SUB 17",
    }));

  const [selectedUser, setSelectedUser] = React.useState(users[0]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <img src={Logo} alt="Imagem do logo" className={styles.logo} />
            <div className={styles.verticalLine}></div>
            <h1 className={styles.text}>Area do Administrador</h1>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.studentList}>
            <h2 className={styles.viewTitle}>VIZUALIZAR ALUNOS</h2>
            <div className={styles.divider}></div>
            {users.map((user, i) => (
              <div
                key={i}
                className={styles.usersEntry}
                onClick={() => setSelectedUser(user)}
                style={{
                  background:
                    selectedUser && selectedUser.rm === user.rm
                      ? "#e0e0e0"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <ClickableUserEntry
                  name={user.name}
                  rm={user.rm}
                  course={user.course}
                  modality={user.modality}
                />
              </div>
            ))}
          </div>

          <div className={styles.studentInfo}>
            <h2 className={styles.studentName}>
              {selectedUser ? selectedUser.name : ""}
            </h2>

            <div className={styles.infoField}>
              <label>RM</label>
              <input
                type="text"
                value={selectedUser ? selectedUser.rm : ""}
                readOnly
              />
            </div>

            <div className={styles.infoField}>
              <label>CURSO</label>
              <input
                type="text"
                value={selectedUser ? selectedUser.course : ""}
                readOnly
              />
            </div>

            <div className={styles.infoField}>
              <label>MODALIDADE</label>
              <input
                type="text"
                value={selectedUser ? selectedUser.modality : ""}
                readOnly
              />
            </div>

            <div className={styles.infoField}>
              <label>CATEGORIA</label>
              <input
                type="text"
                value={selectedUser ? selectedUser.categoria : ""}
                readOnly
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.infoField}>
              <label>FOTO DE PERFIL</label>
              <ProfilePhotoUploader
                photoUrl={genericProfilePhoto}
                onPhotoChange={(newPhoto) => {
                  console.log("New photo URL:", newPhoto);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsArea}>
          <button className={styles.btnAlterar}>Alterar</button>
          <Link to={"/adm"}>
            <button className={styles.btnVoltar}>Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
