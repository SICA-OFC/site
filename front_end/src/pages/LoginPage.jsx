import styles from "./LoginPage.module.scss";
import sideImage from "../assets/sideImage.png";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      email,
      senha,
    };

    fetch("http://localhost:3000/usuario/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${JSON.stringify(result)}`);
        }

        const token = result.token;
        console.log("Token recebido:", token);

        fetch("http://localhost:3000/usuario/login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then(async (loginResponse) => {
          const loginResult = await loginResponse.json();

          if (!loginResponse.ok) {
            throw new Error(
              `Erro ${loginResponse.status}: ${JSON.stringify(loginResult)}`
            );
          }

          console.log("Login efetuado com sucesso:", loginResult);
          fetch("http://localhost:3000/usuario/enviarCodigo", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(response => console.log(response.json()));
          if (loginResult.usuario.verificado == true) {
            navigate("/confirmacao-login", {
              state: { token: token },
            });
          }
          else {
            navigate("/confirmacao-cadastro", {
              state: { token: token },
            });
          }
        });
      })

      .catch((error) => {
        console.error("Erro no processo de token/login:", error.message);
      });
  };

  return (
    <>
      <div className={styles.container_login}>
        <div className={styles.container_grid}>
          <div className={styles.login_box}>
            <div className={styles.logo_div}>
              <div className={styles.logo}>
                <img src={logo} alt="Logo SICA" />
              </div>
              <div className={styles.line}>
                <img src={line} alt="Linha decorativa" />
              </div>
              <h2>Login</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.labe} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                value={email}
                onChange={handleEmailChange}
                type="email"
                id="email"
                name="email"
                required
              />

              <label className={styles.labe} htmlFor="password">
                Senha
              </label>
              <input
                className={styles.input}
                value={senha}
                onChange={handleSenhaChange}
                type="password"
                id="senha"
                name="senha"
                required
              />

              <button
                className={styles.button}
                type="submit"
                name="submit"
                value="login"
              >
                Entrar
              </button>
              <label className={styles.sign_out}>
                Ainda não tem conta?
                <Link to="/cadastro" className={styles.a}>
                  {" "}
                  Cadastre-se!
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
