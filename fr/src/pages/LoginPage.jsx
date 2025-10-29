import logo from "../assets/logo.png";
import sideImage from "../assets/sideImage1.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logar } from "../hooks/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    const setters = {
      email: setEmail,
      senha: setSenha,
    };
    setters[name]?.(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      senha,
    };

    const result = await Logar(data);

    if (result) {
      navigate("/confirmacao", {
        state: { accessToken: result.accessToken },
      });
    }
  };

  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-neutra-branca rounded-md h-fit w-[90%] flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 w-full md:w-[50%] p-6">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Login</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-baseline gap-2 w-fit place-content-between space-y-3.5"
          >
            <div className="space-y-3">
              <label className="text-neutra-preta text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                pattern="^[a-zA-Z0-9._]+@(gmail\.com|hotmail\.com|etec\.sp\.gov\.br)$"
                title="O email deve ser do domínio gmail.com, hotmail.com ou etec.sp.gov.br"
                required
              />

              <label className="text-neutra-preta text-sm" htmlFor="senha">
                Senha
              </label>
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={senha}
                onChange={handleChange}
                type="password"
                id="senha"
                name="senha"
                required
              />
            </div>
            <button
              type="submit"
              name="submit"
              value="login"
              className="w-full h-[50px] bg-secundaria text-white font-semibold rounded-md transition-all
               duration-300 hover:bg-neutra-branca hover:text-neutra-preta hover:border 
               hover:border-secundaria cursor-pointer"
            >
              Entrar
            </button>

            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm text-center w-full">Ainda não tem conta?</span>
              <span className="text-primaria text-sm text-center w-full">
                <Link to="/cadastro"> Cadastre-se!</Link>
              </span>
            </div>
          </form>
        </div>
        <img src={sideImage} className="hidden md:block w-[50%] h-full" />
      </div>
    </div>
  );
}
