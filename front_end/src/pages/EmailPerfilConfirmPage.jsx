import React, { useRef } from "react";

import style from "./EmailConfirmPage.module.scss";
import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import si from "../assets/ConfirmEmailImg.png";

export default function EmailConfirmPage() {
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
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
              <h2>Perfil</h2>
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
                />
              ))}
            </div>
            <button className={style.button}>Verificar</button>
          </div>
          <div className={style.image_section}>
            <img src={si} alt="Imagem de proteção" />
          </div>
        </div>
      </section>
    </div>
  );
}
