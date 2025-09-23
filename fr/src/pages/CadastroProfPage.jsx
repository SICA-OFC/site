import logo from "../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectCursos from "../components/selectCursos.jsx";
import { toast, Bounce } from "react-toastify";

export default function CadastroPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const ADMIN_COD = import.meta.env.VITE_APP_ADMIN_COD;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cod, setCod] = useState("");

  const navigate = useNavigate();
  const toastSettings = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

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

  function handleCodChange(e) {
    setCod(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(ADMIN_COD, cod)
    const userInfo = {
      rm,
      nome,
      email,
      data_nascimento: new Date(data_nascimento),
      senha,
      telefone,
      tipo_usuario: "professor",
    };

    const response = await fetch(`${BASE_URL}/usuario/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Cadastro feito com sucesso, prossiga pra autentificação de 2 fatores!", toastSettings);
      navigate("/confirmacao", {
        state: { accessToken: result.accessToken },
      });
    } else {
      toast.error("Algo deu errado ao cadastrar! Tente novamente!", toastSettings);
      throw new Error(result.message || "Erro no cadastro");
    }
  };

  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-[#f5f5f5] rounded-md w-[80%] h-fit flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 w-full p-6">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Cadastro Professor</h1>
          </div>
          <form className="flex flex-col justify-center items-center gap-5 w-[80%] space-y-2.5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-start items-start gap-[5%]">
              <div className="w-full md:w-[50%]">
                <label className="text-sm text-center w-full" htmlFor="rm">
                  RM
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
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

                <label className="text-sm text-center w-full" htmlFor="nome">
                  Nome
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  value={nome}
                  onChange={handleNomeChange}
                  type="text"
                  id="nome"
                  name="nome"
                  pattern="[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*"
                  required
                />
                <label className="text-sm text-center w-full" htmlFor="nascimento">
                  Data de Nascimento
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  value={data_nascimento}
                  onChange={handleDataChange}
                  type="date"
                  id="nascimento"
                  name="nascimento"
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                <label className="text-sm text-center w-full" htmlFor="email">
                  Email
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label className="text-sm text-center w-full" htmlFor="senha">
                  Senha
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  value={senha}
                  onChange={handleSenhaChange}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />

                <label className="text-sm text-center w-full" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  maxLength="19"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />

                <label className="text-sm text-center w-full" htmlFor="telefone">
                  Código
                </label>
                <input
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                  maxLength="100"
                  value={cod}
                  onChange={handleCodChange}
                  type="text"
                  id="cod"
                  name="cod"
                  required
                />
              </div>
            </div>
            <button
              className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-[50%] hover:bg-neutra-branca hover:text-[#001429] hover:border-secundaria hover:border-1 cursor-pointer transition"
              type="submit"
              name="submit"
              value="login"
            >
              Cadastrar
            </button>
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm text-center w-full">Já tem conta?</span>
              <span>
                <Link to="/login" className="text-primaria text-sm text-center w-full">
                  Entre!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
