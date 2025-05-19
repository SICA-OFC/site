import styles from "./LoginPage.module.scss";
import sideImage from "../assets/sideImage.png";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigate = useNavigate();

  const evtSourceRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const isLoginPage = location.pathname === "/login";
    if (!isLoginPage || !email) return;

    const setupSSE = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/ver`, {
          method: "GET",
          headers: {
            email,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = await response.json();
        const userId = data.id;

        const evtSource = new EventSource(`${BASE_URL}/events/${userId}`);
        evtSourceRef.current = evtSource;

        evtSource.addEventListener("account_unlock", (e) => {
          const data = JSON.parse(e.data);
          console.log("Usuário desbloqueado:", data);
          evtSource.close();
        });

        evtSource.addEventListener("account_lock", () => {
          console.log("Usuário bloqueado. Contate o suporte.");
        });

        evtSource.addEventListener("account_close_connection", () => {
          console.log("Conexão encerrada por evento.");
          evtSource.close();
        });

        evtSource.onopen = () => {
          console.log("SSE conectada na página de login.");
        };

        evtSource.onerror = (err) => {
          console.error("Erro SSE:", err);
        };
      } catch (err) {
        console.error("Erro ao configurar SSE:", err);
      }
    };

    setupSSE();

    return () => {
      if (evtSourceRef.current) {
        evtSourceRef.current.close();
        console.log("SSE fechada ao sair da página de login.");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, email]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  const handleSubmit = (e) => {
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
        email,
        senha,
      };

      return await fetch(`${BASE_URL}/usuario/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      })
        .then(async (response) => {
          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              `Erro ${response.status}: ${JSON.stringify(result)}`
            );
          }

          const accessToken = result.accessToken;
          console.log("Token recebido:", accessToken);

          fetch(`${BASE_URL}/usuario/login`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
            fetch(`${BASE_URL}/usuario/enviarCodigo`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }).then((response) => console.log(response.json()));

            if (loginResult.verificado === true) {
              navigate("/confirmacao-login", {
                state: { accessToken },
              });
            } else {
              navigate("/confirmacao-cadastro", {
                state: { accessToken },
              });
            }
          });
        })
        .catch((error) => {
          console.error("Erro no processo de token/login:", error.message);
        });
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
