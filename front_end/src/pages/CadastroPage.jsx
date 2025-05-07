import styles from "./CadastroPage.module.scss";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import sideImage from "../assets/sideImage.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CadastroPage() {
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("1DS");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  function handleRmChange(e) {
    setRm(e.target.value);
  }

  function handleNomeChange(e) {
    setNome(e.target.value);
  }

  function handleCursoChange(e) {
    setCurso(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleDataChange(e) {
    setData(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  function handleTelefoneChange(e) {
    setTelefone(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      rm: parseInt(rm),
      nome,
      curso,
      email,
      data,
      senha,
      telefone,
      codigoverificacao: Math.floor(99999 + Math.random() * 900000),
      datacriacaocodigo: new Date()
    };

    console.log("Enviando:", JSON.stringify(userInfo));

    fetch("http://localhost:3000/usuario/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        const result = await response.json();
        console.log("Resposta do servidor:", result);
        console.log("o token é ", result.token);
        navigate("/confirmacao-cadastro", {
          state: { token: result.token },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.container_cadastro}>
        <div className={styles.container}>
          <div className={styles.login_box}>
            <div className={styles.logo_div}>
              <div className={styles.logo}>
                <img src={logo} alt="Logo SICA" />
              </div>
              <div className={styles.line}>
                <img src={line} alt="Linha decorativa" />
              </div>
              <h2>Cadastro</h2>
            </div>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              action="#"
              method="post"
            >
              <div className={styles.div}>
                <label className={styles.label} htmlFor="rm">
                  RM
                </label>
                <input
                  className={styles.input_select}
                  value={rm}
                  onChange={handleRmChange}
                  type="number"
                  id="rm"
                  name="rm"
                  pattern="\d{6}"
                  required
                />
              </div>

              <div className={styles.div}>
                <label className={styles.label} htmlFor="nome">
                  Nome
                </label>
                <input
                  className={styles.input_select}
                  value={nome}
                  onChange={handleNomeChange}
                  type="text"
                  id="nome"
                  name="nome"
                  pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                  required
                />
              </div>
              <div className={styles.div}>
                <label className={styles.label} htmlFor="classe">
                  Classe
                </label>
                <select
                  className={styles.input_select}
                  value={curso}
                  onChange={handleCursoChange}
                  id="classe"
                  name="classe"
                  required
                >
                  <option value="1DS">1DS</option>
                  <option value="2DS">2DS</option>
                  <option value="3DS">3DS</option>
                </select>
              </div>

              <div className={styles.div}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <div className={styles.email}>
                  <input
                    className={styles.input_select}
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
              </div>

              {/* <div className={styles.div}>
                <label className={styles.label} htmlFor="sexo">
                  Sexo
                </label>
                <div>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="sexo"
                    value="M"
                    required
                  />{" "}
                  M
                  <input
                    className={styles.radio}
                    type="radio"
                    name="sexo"
                    value="F"
                    required
                    style={{ marginLeft: "25px" }}
                  />{" "}
                  F
                </div>
              </div> */}

              <div className={styles.div}>
                <label className={styles.label} htmlFor="nascimento">
                  Data de Nascimento
                </label>
                <input
                  className={styles.input_select}
                  value={data}
                  onChange={handleDataChange}
                  type="date"
                  id="nascimento"
                  name="nascimento"
                  min="1900-01-01"
                  required
                />
              </div>

              <div className={styles.div}>
                <label className={styles.label} htmlFor="password">
                  Senha
                </label>
                <input
                  className={styles.input_select}
                  value={senha}
                  onChange={handleSenhaChange}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />
              </div>

              <div className={styles.div}>
                <label className={styles.label} htmlFor="telefone">
                  Telefone
                </label>
                <input
                  className={styles.input_select}
                  value={telefone}
                  onChange={handleTelefoneChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />
              </div>

              <div className={styles.div}>
                <button
                  className={styles.button}
                  type="submit"
                  name="submit"
                  value="cadastrar"
                >
                  Cadastrar
                </button>
              </div>

              <label className={styles.sign_out}>
                Já tem conta?
                <Link to="/login" className={styles.a}>
                  {" "}
                  Entre!
                </Link>
              </label>
            </form>
          </div>
          <div className={styles.image_box}>
            <img src={sideImage} alt="Usuário" className={styles.user_image} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroPage;
