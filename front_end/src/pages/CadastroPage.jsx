import styles from "./CadastroPage.module.scss";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SelectCursos from "../components/selectCursos";

function CadastroPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [curso, setCurso] = useState("1DS");
  const [email, setEmail] = useState("");
  const [datanascimento, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha();

  function handleRmChange(e) {
    setRm(e.target.value);
  }

  function handleNomeChange(e) {
    setNome(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log("reCAPTCHA ainda não disponivel");
      return;
    }

    executeRecaptcha("login_form").then(async (tokenCaptcha) => {
      console.log("reCAPTCHA token:", tokenCaptcha);

      const verifyResponse = await fetch(
        `http://localhost:3000/captcha?token=${tokenCaptcha}`
      );
      const verifyResult = await verifyResponse.json();
      if (!verifyResult.success || verifyResult.score < 0.5) {
        alert("Verificação do reCAPTCHA falhou. Ação bloqueada.");
        throw new Error("reCAPTCHA inválido.");
      }

      const userInfo = {
        rm,
        nome,
        curso: parseInt(curso),
        email,
        datanascimento: new Date(datanascimento),
        senha,
        telefone,
        tipousuario: "Aluno",
      };

      const response = await fetch(`${BASE_URL}/usuario/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();
      console.log("Resposta do servidor:", result);

      if (response.ok) {
        navigate("/confirmacao-cadastro", {
          state: { accessToken: result.accessToken },
        });
      } else {
        throw new Error(result.message || "Erro no cadastro");
      }
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
              <div className={styles.form_container}>
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
                    min="10000"
                    max="99999"
                    pattern="\d{5}"
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
                    pattern="[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*"
                    required
                  />
                </div>
                <div className={styles.div}>
                  <label className={styles.label} htmlFor="classe">
                    Classe
                  </label>
                  <SelectCursos
                    periodo={periodo}
                    curso={curso}
                    onPeriodoChange={setPeriodo}
                    onCursoChange={setCurso}
                  />
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
              <div className={styles.form_container}>
                <div className={styles.div}>
                  <label className={styles.label} htmlFor="nascimento">
                    Data de Nascimento
                  </label>
                  <input
                    className={styles.input_select}
                    value={datanascimento}
                    onChange={handleDataChange}
                    type="date"
                    id="nascimento"
                    name="nascimento"
                    min="1920-01-01"
                    max={new Date().toISOString().split("T")[0]}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroPage;
