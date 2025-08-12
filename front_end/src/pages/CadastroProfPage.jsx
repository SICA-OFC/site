import logo from "../assets/logo.png";
import line from "../assets/Line.png";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function CadastroProfPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [datanascimento, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "rm": setRm(value); break;
      case "nome": setNome(value); break;
      case "email": setEmail(value); break;
      case "nascimento": setData(value); break;
      case "senha": setSenha(value); break;
      case "telefone": setTelefone(value); break;
      default: break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log("reCAPTCHA ainda não disponivel");
      return;
    }

    try {
      const tokenCaptcha = await executeRecaptcha("login_form");
      const verifyResponse = await fetch(`${BASE_URL}/usuario/captcha?token=${tokenCaptcha}`);
      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success || verifyResult.score < 0.5) {
        alert("Verificação do reCAPTCHA falhou. Ação bloqueada.");
        return;
      }

      const userInfo = {
        rm,
        nome,
        email,
        datanascimento: new Date(datanascimento),
        senha,
        telefone,
        tipousuario: "Professor",
      };

      const response = await fetch(`${BASE_URL}/usuario/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/confirmacao-cadastro", { state: { accessToken: result.accessToken } });
      } else {
        alert(result.message || "Erro no cadastro");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro no cadastro. Tente novamente.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center font-montserrat"
      style={{ backgroundImage: "url('/src/assets/background.png')" }}
    >
      <div className="flex max-w-7xl w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="flex-1 p-10 flex flex-col gap-4 justify-center">
          <div className="flex items-center justify-evenly w-52 mb-4">
            <div className="flex items-center mb-1">
              <img src={logo} alt="Logo SICA" className="w-10 h-10 mr-1" />
            </div>
            <div className="h-px w-full bg-gray-400 mx-2"></div>
            <h2 className="text-2xl font-semibold text-[#001429]">Cadastro - 2</h2>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10" noValidate>
            <div className="flex gap-10 w-full">
              {/* Coluna esquerda */}
              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-col">
                  <label htmlFor="rm" className="text-[#001429] mb-1">RM</label>
                  <input
                    id="rm"
                    name="rm"
                    type="text"
                    pattern="\d{5}"
                    minLength={5}
                    maxLength={5}
                    required
                    value={rm}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="nome" className="text-[#001429] mb-1">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    pattern="[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*"
                    required
                    value={nome}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#001429] mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>
              </div>

              {/* Coluna direita */}
              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-col">
                  <label htmlFor="nascimento" className="text-[#001429] mb-1">Data de Nascimento</label>
                  <input
                    id="nascimento"
                    name="nascimento"
                    type="date"
                    min="1920-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    required
                    value={datanascimento}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="senha" className="text-[#001429] mb-1">Senha</label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    value={senha}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="telefone" className="text-[#001429] mb-1">Telefone</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="text"
                    required
                    value={telefone}
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md text-[#001429] focus:outline-none focus:border-[#f18e2c]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 px-6 py-3 bg-[#092843] text-white rounded-md w-1/2 hover:bg-white hover:text-[#001429] hover:border hover:border-[#001429] transition-colors"
            >
              Cadastrar
            </button>

            <p className="text-center mt-3">
              Já tem conta?{" "}
              <Link to="/login" className="text-[#f18e2c] hover:underline">
                Entre!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroProfPage;
