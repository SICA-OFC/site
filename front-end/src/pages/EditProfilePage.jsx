import { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.png";
import ProfileUploader from "../components/ProfileUploader.jsx";
import SelectCursos from "../components/selectCursos.jsx";
import { DeletarUsuário, EditarUsuário, verModalidades, verUsuário } from "../hooks/api.js";
import { Link, useNavigate } from "react-router-dom";
import { formatTelefone } from "../utils/sanitization.js";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [rm, setRm] = useState("");
  const [nomeExib, setNomeExib] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedModalidades, setSelectedModalidades] = useState([]);
  const [file, setFile] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchedRef = useRef(false);

  const [availableModalidades, setAvailableModalidades] = useState([]);
  async function handleUser() {
    const result = await verUsuário();
    const { modalidades } = await verModalidades();

    if (result && modalidades) {
      const usuario = result.usuario;
      changeForm(usuario);
      setAvailableModalidades(modalidades);

      const userModalidades = usuario.usuario_modalidades?.map((m) => m.modalidade_id) || [];
      setSelectedModalidades(userModalidades);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    handleUser();
  }, []);

  function changeForm(usuario) {
    setNomeExib(usuario.nome);
    setRm(usuario.rm);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setDataNascimento(new Date(usuario.data_nascimento).toISOString().split("T")[0]);
    setTelefone(usuario.telefone);
    setFile(usuario.foto_perfil || null);

    const isUserAdmin = usuario.tipo_usuario === "professor";
    setIsAdmin(isUserAdmin);
    if (!isUserAdmin) {
      setPeriodo(`${usuario.cursos.periodo}`);
      setCurso(usuario.curso_id);
    }
  }

  function handleChange(e) {
    const { name, value, checked } = e.target;
    if (name === "modalidade") {
      setSelectedModalidades((prev) =>
        checked ? [...prev, parseInt(value)] : prev.filter((id) => id !== parseInt(value))
      );
    }

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
    data.append("data_nascimento", data_nascimento);
    data.append("telefone", telefone);
    data.append("curso_id", parseInt(curso));

    const modalidades = Array.isArray(selectedModalidades)
      ? selectedModalidades.map((id) => Number(id)).filter((id) => !isNaN(id))
      : [];

    modalidades.forEach((id) => {
      data.append("modalidades[]", parseInt(id));
    });

    if (file && file instanceof File) {
      data.append("photo", file);
    }

    const result = await EditarUsuário(data);
    console.log(data);
    if (result) {
      setNomeExib(result.nome);
    }
  };

  const handleDeletar = async () => {
    const result = await DeletarUsuário();
    setShowDeleteModal(false);
    if (result) {
      navigate("/");
    }
  };

  return (
    <>
      <div
        className="font-montserrat flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: Logo }}
      >
        <div
          className="flex md:max-w-[70vw] w-[90%] bg-gray-100 rounded-lg overflow-hidden 
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

            <h3 className="text-secundaria text-2xl">Olá, {nomeExib || "Usuário"}.</h3>
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
                <div className="flex flex-col md:flex-row justify-around w-full gap-0">
                  <div className="flex flex-col gap-2 w-[90%] md:w-2/5">
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
                          id="nome"
                          name="nome"
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

                  <div className="flex flex-col gap-2 w-[90%] md:w-2/5">
                    {!isAdmin && (
                      <>
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
                          <h4 className="text-neutra-preta mb-2 font-bold">Modalidades</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {availableModalidades &&
                              availableModalidades.map((mod) => (
                                <label key={mod.id} className="flex items-center gap-2 text-neutra-preta">
                                  <input
                                    type="checkbox"
                                    name="modalidade"
                                    value={mod.id}
                                    checked={selectedModalidades.includes(mod.id)}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                  />
                                  {mod.nome}
                                </label>
                              ))}
                          </div>
                        </section>
                      </>
                    )}

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

                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-md font-semibold cursor-pointer
                  transition-all duration-300 hover:bg-neutra-branca hover:text-red-600 hover:border
                  hover:border-red-600"
                  >
                    Deletar Conta
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] [box-shadow:0px_5px_20px_10px_#aaaaaa78] max-w-sm flex flex-col items-center gap-4">
            <p className="text-center text-red-600 font-semibold">Deseja deletar sua conta? (Irreversível)</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleDeletar}
                className="px-6 py-3 bg-red-600 text-white rounded-md font-semibold cursor-pointer
                  transition-all duration-300 hover:bg-neutra-branca hover:text-red-600 hover:border
                  hover:border-red-600"
              >
                Sim
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 bg-secundaria text-white rounded-md font-semibold cursor-pointer
                  transition-all duration-300 hover:bg-neutra-branca hover:text-neutra-preta hover:border
                  hover:border-secundaria"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
