import logo from "../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SelectCursos from "../components/selectCursos.jsx";

export default function CadastroPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("1");
  const [curso, setCurso] = useState("1");
  const [email, setEmail] = useState("");
  const [data_nascimento, setData] = useState("");
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
      const verifyResponse = await fetch(`${BASE_URL}/usuario/captcha?token=${tokenCaptcha}`);
      const verifyResult = await verifyResponse.json();
      if (!verifyResult.success || verifyResult.score < 0.5) {
        alert("Verificação do reCAPTCHA falhou. Ação bloqueada.");
        throw new Error("reCAPTCHA inválido.");
      }

      const userInfo = {
        rm,
        nome,
        curso_id: parseInt(curso),
        email,
        data_nascimento: new Date(data_nascimento),
        senha,
        telefone,
        tipo_usuario: "aluno",
      };

      const response = await fetch(`${BASE_URL}/usuario/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();
      console.log("Resposta do servidor:", result);

      if (response.ok) {
        navigate("/confirmacao", {
          state: { accessToken: result.accessToken },
        });
      } else {
        throw new Error(result.message || "Erro no cadastro");
      }
    });
  };

  return (
    <div className="bg-neutra-preta h-full flex flex-col justify-baseline py-3 items-center gap-2">
      <div className="bg-[#f5f5f5] rounded-md w-[80%] h-fit flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 w-full p-6">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Cadastro</h1>
          </div>
          <form className="flex flex-col justify-center items-center gap-5 w-[80%]" onSubmit={handleSubmit}>
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
                  min="1920-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                <label className="text-sm text-center w-full" htmlFor="classe">
                  Classe
                  <SelectCursos periodo={periodo} curso={curso} onPeriodoChange={setPeriodo} onCursoChange={setCurso} />
                </label>
              </div>
              <div className="w-full md:w-[50%]">
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
                  value={telefone}
                  onChange={handleTelefoneChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />
              </div>
            </div>
            <button
              className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-[50%] hover:bg-neutra-branca hover:text-[#001429] hover:border-secundaria hover:border-1 hover:cursor-pointer transition"
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