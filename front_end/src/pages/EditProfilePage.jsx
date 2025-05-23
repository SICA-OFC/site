import Logo from "../assets/logo.png";
import styles from "./EditProfilePage.module.scss";

export default function EditProfilePage() {
  return (
    <div className={styles.container_cadastro}>
      <div className={styles.container}>
        <div className={styles.login_box}>
          <div className={styles.logo_div}>
            <div className={styles.logo}>
              <img src={Logo} alt="Logo SICA" />
            </div>
            <div className={styles.verticalLine}></div>
            <h2>Editar Perfil</h2>
          </div>
          <h3>Olá, Nome do Brother</h3>
          <div className={styles.horizontalLine}></div>
          <form className={styles.form} action="#" method="post">
            <div className={styles.form_container}>
              <div className={styles.left}>
                {/* Dados Pessoais */}
                <div className={styles.section}>
                  <h4>Dados Pessoais</h4>
                  <div className={styles.div}>
                    <label htmlFor="name" className={styles.label}>
                      Nome
                    </label>
                    <input
                      className={styles.input_select}
                      type="text"
                      id="name"
                      name="name"
                      value="Nome do Brother"
                      required
                    />
                  </div>
                  <div className={styles.div}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input
                      className={styles.input_select}
                      type="email"
                      id="email"
                      name="email"
                      value="emaildobrother@exemplo.com"
                      required
                    />
                  </div>
                  <div className={styles.div}>
                    <label htmlFor="telefone" className={styles.label}>
                      Telefone
                    </label>
                    <input
                      className={styles.input_select}
                      type="text"
                      maxLength="11"
                      id="telefone"
                      name="telefone"
                      value="1199999-9999"
                      required
                    />
                  </div>
                  <div className={styles.div}>
                    <label htmlFor="dataNascimento" className={styles.label}>
                      Data de Nascimento
                    </label>
                    <input
                      className={styles.input_select}
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      required
                    />
                  </div>
                </div>
                {/* Informações Acadêmicas */}
                <div className={styles.section}>
                  <h4>Informações Acadêmicas</h4>
                  <div className={styles.div}>
                    <label htmlFor="curso" className={styles.label}>
                      Curso
                    </label>
                    <select
                      className={styles.input_select}
                      id="curso"
                      name="curso"
                      required
                    >
                      <option value="">Selecione o curso</option>
                      <option value="engenharia">Engenharia</option>
                      <option value="direito">Direito</option>
                      <option value="medicina">Medicina</option>
                      <option value="adm">Administração</option>
                    </select>
                  </div>
                </div>
                {/* Modalidades */}
                <div className={styles.section}>
                  <h4>Modalidades</h4>
                  <div className={styles.div}>
                    <label htmlFor="modalidades" className={styles.label}>
                      Modalidades
                    </label>
                    <select
                      className={styles.input_select}
                      id="modalidades"
                      name="modalidades"
                      required
                    >
                      <option value="futebol">Futebol</option>
                      <option value="volei">Vôlei</option>
                      <option value="basquete">Basquete</option>
                      <option value="natacao">Natação</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                {/* Imagem de Perfil */}
                <div className={styles.section}>
                  <h4>Imagem de Perfil</h4>
                  <div className={styles.div}>
                    <label htmlFor="imagemPerfil" className={styles.label}>
                      Imagem de Perfil
                    </label>
                    <input
                      className={styles.input_image}
                      type="file"
                      id="imagemPerfil"
                      name="imagemPerfil"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
