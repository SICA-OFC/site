import React, { useRef, useState } from "react";
import style from "./EmailConfirmPage.module.scss";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import si from "../assets/ConfirmEmailImg.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function EmailConfirmPage() {
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const [codigoArray, setCodigoArray] = useState(["", "", "", "", "", ""]);

  const location = useLocation();
  const { token } = location.state || {};

  const handleInputChange = (e, index) => {
    const newCodigo = [...codigoArray];
    newCodigo[index] = e.target.value;
    setCodigoArray(newCodigo);

    if (
      e.target.value.length === e.target.maxLength &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const codigoVerificacao = codigoArray.join(""); 
    console.log(token);
    const cadastroResponse = await fetch("http://localhost:3000/usuario/verificarCadastro", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoVerificacao }),
      });

      const CadastroResult = await cadastroResponse.json();

      if (!cadastroResponse.ok) {
        throw new Error(
          `Erro ${CadastroResult.status}: ${JSON.stringify(CadastroResult)}`
        );
      }

      console.log("Cadastro efetivado com sucesso:", CadastroResult);
      navigate("/");
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
              <h2>Cadastro</h2>
            </div>
            <p className={style.title}>
              Insira o código que foi
              <br />
              enviado para seu email
            </p>
            <p className={style.subtitle}>
              Uma camada a mais de proteção para sua conta!
            </p>
            <div className={style.code_input}>
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={codigoArray[index]}
                />
              ))}
            </div>
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
