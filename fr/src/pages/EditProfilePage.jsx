import { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.png";
import ProfileUploader from "../components/ProfileUploader.jsx";
import SelectCursos from "../components/selectCursos.jsx";
import { EditarUsuário, verUsuário } from "../hooks/api.js";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [file, setFile] = useState("");

  const fetchedRef = useRef(false);
  const nomeRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchUsuario = async () => {
      const result = await verUsuário();
      if (result) {
        console.log(result);
        const usuario = result.usuario;
        nomeRef.current = usuario.nome;
        setRm(usuario.rm);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setDataNascimento(new Date(usuario.data_nascimento).toISOString().split("T")[0]);
        setTelefone(usuario.telefone);
        setPeriodo(`${usuario.cursos.periodo}`);
        setCurso(usuario.curso_id);
        setFile(usuario.foto_perfil || null);
      } else {
        navigate("/");
      }
    };

    fetchUsuario();
  }, []);

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
      nome: setNome,
      email: setEmail,
      data_nascimento: setDataNascimento,
      telefone: (v) => setTelefone(formatTelefone(v)),
    };
    setters[name]?.(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nome", nome);
    data.append("email", email);
    data.append("data_nascimento", new Date(data_nascimento).toISOString());
    data.append("telefone", telefone);
    data.append("curso_id", parseInt(curso));

    if (file) {
      data.append("photo", file);
    }

    const result = await EditarUsuário(data);

    if (result) {
      nomeRef.current = nome;
    }
  };

  return (
    <div
      className="font-montserrat flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: Logo }}
    >
      <div
        className="flex max-w-[70vw] w-full bg-gray-100 rounded-lg overflow-hidden 
        [box-shadow:0px_5px_20px_10px_#aaaaaa78]"
      >
        <div className="flex flex-col gap-1 px-5 py-2 flex-1">
          <div className="flex gap-2 w-[250px]">
            <div className="flex items-center mb-0.5">
              <img src={Logo} alt="Logo SICA" className="w-10 h-10 mr-0.5" />
            </div>
            <div className="border-l border-secundaria" />
            <h2 className="text-secundaria self-center">Editar Perfil</h2>
          </div>

          <h3 className="text-secundaria text-2xl">Olá, {nomeRef.current || "Usuário"}.</h3>
          <div className="border-t border-secundaria w-full" />

          <form
            action="#"
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            method="post"
            className="flex gap-[10%] w-full"
          >
            <div className="w-full flex flex-col justify-center items-center">
              <div className="flex flex-row justify-around w-full gap-0">
                <div className="flex flex-col gap-2 w-2/5">
                  {/* Dados Pessoais */}
                  <section className="relative">
                    <h4 className="text-neutra-preta mb-2 font-bold">Dados Pessoais</h4>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="rm" className="mb-1 text-neutra-preta">
                        RM
                      </label>
                      <input
                        type="number"
                        id="rm"
                        name="rm"
                        min="10000"
                        max="99999"
                        pattern="\d{5}"
                        value={rm}
                        disabled
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-gray-400 text-base w-full"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="name" className="mb-1 text-neutra-preta">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={nome}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        pattern="[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*"
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-neutra-preta text-base w-full"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="email" className="mb-1 text-neutra-preta">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-neutra-preta text-base w-full"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="telefone" className="mb-1 text-neutra-preta">
                        Telefone
                      </label>
                      <input
                        type="text"
                        maxLength="15"
                        minLength="13"
                        id="telefone"
                        name="telefone"
                        value={telefone}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-neutra-preta text-base w-full"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="dataNascimento" className="mb-1 text-neutra-preta">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        id="dataNascimento"
                        value={data_nascimento}
                        onChange={handleChange}
                        min="2000-01-01"
                        max={new Date().toISOString().split("T")[0]}
                        required
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-neutra-preta text-base w-full"
                      />
                    </div>
                  </section>
                </div>

                <div className="flex flex-col gap-2 w-2/5">
                  {/* Informações Acadêmicas */}
                  <section className="relative">
                    <h4 className="text-neutra-preta mb-2 font-bold">Informações Acadêmicas</h4>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="curso" className="mb-1 text-neutra-preta">
                        Curso
                        <SelectCursos
                          periodo={periodo}
                          curso={curso}
                          onPeriodoChange={setPeriodo}
                          onCursoChange={setCurso}
                        />
                      </label>
                    </div>
                  </section>
                  {/* Modalidades */}
                  <section className="relative">
                    <div className="flex flex-col mb-2">
                      <label htmlFor="modalidades" className="mb-1 text-neutra-preta">
                        Modalidades
                      </label>
                      <select
                        id="modalidades"
                        name="modalidades"
                        required
                        className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-neutra-preta text-base w-full"
                      >
                        <option value="futebol">Futebol</option>
                        <option value="volei">Vôlei</option>
                        <option value="basquete">Basquete</option>
                        <option value="natacao">Natação</option>
                      </select>
                    </div>
                  </section>
                  {/* Imagem de Perfil */}
                  <section className="relative">
                    <h4 className="text-neutra-preta mb-2">Imagem de Perfil</h4>
                    <div className="flex flex-col mb-2">
                      <ProfileUploader file={file} onFileChange={setFile} />
                    </div>
                  </section>
                </div>
              </div>
              <div className="h-full w-full flex flex-row justify-center items-center gap-5">
                <button
                  type="submit"
                  name="submit"
                  value="login"
                  className="px-6 py-3 bg-secundaria text-white rounded-md font-semibold cursor-pointer
                transition-all duration-300 hover:bg-neutra-branca hover:text-neutra-preta hover:border
                hover:border-secundaria"
                >
                  Editar
                </button>
                <Link
                  className="px-6 py-3 bg-destaque text-neutra-branca rounded-md font-semibold cursor-pointer
                transition-all duration-300 hover:bg-neutra-branca hover:text-destaque hover:border
                hover:border-secundaria"
                  to="/"
                >
                  Voltar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
