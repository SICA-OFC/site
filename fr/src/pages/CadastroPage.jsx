import logo from "../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectCursos from "../components/selectCursos.jsx";
import { toast, Bounce } from "react-toastify";

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
  const [hover, setHover] = useState(false);
  const [modalidades, setModalidades] = useState({
    futebol: false,
    vôlei: false,
    basquete: false,
    natação: false,
  });

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

  const handleModalidadeChange = (e) => {
    const { value, checked } = e.target;
    setModalidades((prev) => ({ ...prev, [value]: checked }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userInfo = {
      rm,
      nome,
      curso_id: parseInt(curso),
      email,
      data_nascimento: new Date(data_nascimento),
      senha,
      telefone,
      tipo_usuario: "aluno",
      modalidades: JSON.stringify(modalidades)
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
      <div className="bg-[#f5f5f5] rounded-md w-[70%] h-fit flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 w-full p-2">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Cadastro</h1>
          </div>
          <form className="flex flex-col justify-center items-center gap-5 w-[80%] space-y-2.5" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start items-start gap-[5%]">
              <div className="w-[50%]">
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
                  min="2000-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                <label className="text-sm text-center w-full" htmlFor="classe">
                  Classe
                  <SelectCursos periodo={periodo} curso={curso} onPeriodoChange={setPeriodo} onCursoChange={setCurso} />
                </label>
              </div>
              <div className="w-[50%]">
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
                  maxLength="19"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />

                <label className="text-sm text-center w-full" htmlFor="telefone">
                  Modalidades
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(modalidades).map((mod) => (
                    <label key={mod} className="text-sm">
                      <input
                        type="checkbox"
                        value={mod}
                        checked={modalidades[mod]}
                        onChange={handleModalidadeChange}
                      />
                      {" " + mod.charAt(0).toUpperCase() + mod.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button
              style={{
                backgroundColor: hover ? "#F5F5F5" : "#092843", // bg-secundaria / hover:bg-neutra-branca
                color: hover ? "#001429" : "white",            // text-white / hover:text-[#001429]
                border: hover ? "1px solid #092843" : "none", // hover:border-secundaria
                borderRadius: "0.375rem",                      // rounded-md
                fontWeight: 600,                               // font-semibold
                height: "50px",
                width: "50%",                                 // w-full
                cursor: "pointer",                             // cursor-pointer
                transition: "all 0.3s",                        // transition
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
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
