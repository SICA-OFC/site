import { BASE_URL, ADMIN_COD } from "../utils/enviromentSettings.js";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings.js";

export default function CadastroPage() {
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cod, setCod] = useState("");

  const navigate = useNavigate();

  function formatTelefone(value) {
    value = value.replace(/\D/g, "");
    value = value.substring(0, 11);

    if (value.length > 10) {
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    if (value.length > 6) {
      return value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    }
    if (value.length > 2) {
      return value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const setters = {
      rm: (v) => setRm(v.replace(/\D/g, "")),
      nome: setNome,
      email: setEmail,
      data_nascimento: setData,
      senha: setSenha,
      telefone: (v) => setTelefone(formatTelefone(v)),
      cod,
      setCod,
    };
    setters[name]?.(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <div className="bg-neutra-branca rounded-xl shadow-lg w-[80%] h-[96%] flex flex-row justify-between items-start p-6">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy] text-xl">Cadastro Professor</h1>
          </div>

          <form className="flex flex-col justify-center items-center gap-5 w-[80%]" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start items-start gap-[5%] w-full">
              {/* Coluna Esquerda */}
              <div className="w-[50%] space-y-2">
                <label className="text-sm" htmlFor="rm">
                  RM
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  value={rm}
                  onChange={handleChange}
                  type="number"
                  id="rm"
                  name="rm"
                  min="10000"
                  max="99999"
                  required
                />

                <label className="text-sm" htmlFor="nome">
                  Nome
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  value={nome}
                  onChange={handleChange}
                  type="text"
                  id="nome"
                  name="nome"
                  pattern="[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*"
                  required
                />

                <label className="text-sm" htmlFor="nascimento">
                  Data de Nascimento
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  value={data_nascimento}
                  onChange={handleChange}
                  type="date"
                  id="nascimento"
                  name="data_nascimento"
                  min="2000-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {/* Coluna Direita */}
              <div className="w-[50%] space-y-2">
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  value={email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                />

                <label className="text-sm" htmlFor="senha">
                  Senha
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  value={senha}
                  onChange={handleChange}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />

                <label className="text-sm" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-full"
                  maxLength="15"
                  minLength="13"
                  value={telefone}
                  onChange={handleChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />
              </div>
            </div>
            <label className="text-sm w-full" htmlFor="telefone">
              Código
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                maxLength="100"
                value={cod}
                onChange={handleChange}
                type="text"
                id="cod"
                name="cod"
                required
              />
            </label>
            <div className="flex flex-col justify-center items-center gap-[5%] w-full">
              <button
                type="submit"
                className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-1/2 cursor-pointer 
              transition-all duration-300 hover:bg-neutra-branca hover:text-secundaria hover:border 
              hover:border-secundaria"
              >
                Cadastrar
              </button>

              <div className="flex flex-col items-center justify-center w-full">
                <span className="text-sm text-center">Já tem conta?</span>
                <Link to="/login" className="text-primaria text-sm text-center hover:underline">
                  Entre!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
