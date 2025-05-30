import style from "./EmailConfirmPage.module.scss";
import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import si from "../assets/ConfirmEmailImg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CodeInput from "../components/codeInput";

export default function EmailConfirmPage() {
  const navigate = useNavigate();

  const [codigoArray, setCodigoArray] = useState(Array(6).fill(""));

  const location = useLocation();
  const { accessToken } = location.state || {};

  const handleSubmit = async (e) => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    e.preventDefault();

    try {
      const codigoverificacao = codigoArray.join("");
      console.log(accessToken);
      const loginResponse = await fetch(`${BASE_URL}/usuario/verificar`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoverificacao }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(
          `Erro ${loginResponse.status}: ${
            errorData.erro || "Falha na verificação"
          }`
        );
      }

      const loginResult = await loginResponse.json();
      console.log("login efetivado com sucesso", loginResult);
      navigate("/");
    } catch (error) {
      console.error("Erro durante a verificação:", error.message);
    }
  };

  return (
    <div className={style.body}>
      <section className={style.section}>
        <div className={style.container_grid}>
          <div className={style.form_section}>
            <div className={style.logo_div}>
              <div className={style.logo}>
                <img src={logo} alt="Logo SICA" />
              </div>
              <div className={style.line}>
                <img src={line} alt="Linha decorativa" />
              </div>
              <h2>Login</h2>
            </div>
            <p className={style.title}>
              Insira o código que foi
              <br />
              enviado para seu email
            </p>
            <p className={style.subtitle}>
              Uma camada a mais de proteção para sua conta!
            </p>
            <CodeInput
              value={codigoArray}
              onChange={setCodigoArray}
              className={style.code_input}
            />
            <input
              type="submit"
              onClick={handleSubmit}
              className={style.button}
              value="Verificar"
            />
          </div>
          <div className={style.image_section}>
            <img src={si} alt="Imagem de proteção" />
          </div>
        </div>
      </section>
    </div>
  );
}
