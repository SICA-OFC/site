import { useState } from "react";
import "./App.css";

import sideImage from "./assets/sideImage.png";
import logo from "./assets/logo.png";

function App() {
  return (
    <>
      <div className="container-grid">
        <div className="login-box">
          <img src={logo} alt="Logo SICA" className="logo" />
          <h2>Login</h2>
          <form action="#" method="post">
            <label for="rm">RM</label>
            <input type="text" id="rm" name="rm" pattern="\d{6}" required />

            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha" required />

            <button type="submit" name="submit" value="login">
              Entrar
            </button>
            <label className="sign-out">
              Ainda não tem conta?<a href="#"> Cadastre-se!</a>
            </label>
          </form>
        </div>
        <div class="image-box">
          <img src={sideImage} alt="Usuário" className="user-image" />
        </div>
      </div>
    </>
  );
}

export default App;
