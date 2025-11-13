import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatTelefone } from "../../utils/sanitization.js";
import Logo from "../../assets/logo.png";
import ProfileUploader from "../../components/ProfileUploader.jsx";
import SelectCursos from "../../components/selectCursos.jsx";
import { HandleIsAdmin } from "../../utils/handleIsAdmin.js";
import { EditarUsuário, verModalidades, verUsuários } from "../../hooks/api.js";

function ClickableUserEntry({ name, rm, course }) {
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">
        {name} | {rm} | {course}
      </span>
    </p>
  );
}

export default function ManagementUsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [id, setId] = useState("");
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [nomeExib, setNomeExib] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedModalidades, setSelectedModalidades] = useState([]);
  const [file, setFile] = useState(null);

  const [filtro, setFiltro] = useState("");
  const [availableModalidades, setAvailableModalidades] = useState([]);
  function ChangeForm(usuario) {
    setNomeExib(usuario.nome || "");
    setId(usuario.id);
    setRm(usuario.rm || "");
    setNome(usuario.nome || "");
    setEmail(usuario.email || "");
    setDataNascimento(usuario.data_nascimento ? new Date(usuario.data_nascimento).toISOString().split("T")[0] : "");
    setTelefone(usuario.telefone || "");
    setPeriodo(`${usuario.cursos?.periodo || ""}`);
    setCurso(usuario.curso_id || "");
    setFile(usuario.foto_perfil || null);
    const userModalidades = selectedUser.usuario_modalidades?.map((m) => m.modalidade_id) || [];
    setSelectedModalidades(userModalidades);
  }

  const HandleLoading = async () => {
    const isAdmin = await HandleIsAdmin(navigate);
    if (!isAdmin) return;

    const { usuarios } = await verUsuários();
    const { modalidades } = await verModalidades();
    if (usuarios && usuarios.length > 0 && modalidades) {
      setUsers(usuarios);
      setSelectedUser(usuarios[0]);
      setAvailableModalidades(modalidades);
    } else {
      navigate("/");
    }
  };

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    HandleLoading();
  });

  useEffect(() => {
    if (selectedUser) {
      ChangeForm(selectedUser);
    }
  }, [selectedUser]);

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

  const handleFiltroChange = (e) => {
    const value = e.target.value;
    setFiltro(value);
    if (!value) {
      setSelectedUser(users[0]);
      return;
    }
  };

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
      data.append("modalidades[]", id);
    });

    if (file && file instanceof File) {
      data.append("photo", file);
    }

    const result = await EditarUsuário(data, id);
    if (result) {
      setNomeExib(result.nome);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-montserrat">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-[80%] max-w-[1200px] shadow-md rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
            <div className="border-l border-neutra-preta w-2.5 h-[50px]"></div>
            <h1 className="text-lg font-[energy] mt-5">Usuários</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8 h-[60vh]">
          {/* Lista de usuários */}
          <div className="h-[85%] w-[50%]">
            <h2 className="text-lg font-[energy] border-b-2 border-b-black">VISUALIZAR ALUNOS</h2>
            <div className="flex flex-col h-full justify-between">
              {!users.length && <p className="text-center">Carregando usuários...</p>}
              <div className="w-full max-h-[80%] overflow-y-scroll flex flex-col">
                {users
                  .filter((u) => {
                    if (!filtro) return true;
                    const filtredUsers = u.usuario_modalidades?.some((m) => String(m.modalidade_id) === String(filtro));
                    return filtredUsers;
                  })
                  .map((u) => (
                    <div key={u.id} onClick={() => setSelectedUser(u)} className="cursor-pointer hover:bg-gray-100 p-1">
                      <ClickableUserEntry name={u.nome} rm={u.rm} course={u.cursos?.sigla || "—"} />
                    </div>
                  ))}
              </div>
              <div>
                <label className="text-sm text-center w-full" htmlFor="filtro">
                  Modalidade
                </label>
                <select
                  id="filtro"
                  value={filtro}
                  onChange={handleFiltroChange}
                  className="bg-neutra-branca border rounded-lg p-3 w-full"
                >
                  <option value="">Selecione uma modalidade</option>
                  {availableModalidades.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Info do aluno selecionado */}
          <div className="h-[85%] w-[50%] flex flex-col">
            <h2 className="text-xl font-bold  border-b-2 border-b-black font-[Energy]">
              {selectedUser ? nomeExib : "ALUNO"}
            </h2>
            <div className="h-full w-full overflow-y-scroll">
              <div className="flex flex-col justify-around w-full gap-2">
                {/* Dados Pessoais */}
                <h4 className="text-neutra-preta font-bold">Dados Pessoais</h4>
                <div className="flex flex-col mb-2">
                  <input type="hidden" name="id" value={id} />
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
                    onChange={handleChange}
                    disabled
                    className="px-3 py-2 bg-gray-100 border rounded text-[#aaa] text-base w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="nome" className="mb-1 text-neutra-preta">
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
                    pattern="[a-zA-Z\u00C0-\u024F]+( [a-zA-Z\u00C0-\u024F]+)*"
                    className="px-3 py-2 bg-gray-100 border rounded text-neutra-preta text-base w-full"
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
                    className="px-3 py-2 bg-gray-100 border rounded text-neutra-preta text-base w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="telefone" className="mb-1 text-neutra-preta">
                    Telefone
                  </label>
                  <input
                    type="text"
                    maxLength="19"
                    id="telefone"
                    name="telefone"
                    value={telefone}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 bg-gray-100 border rounded text-neutra-preta text-base w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="data_nascimento" className="mb-1 text-neutra-preta">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="data_nascimento"
                    name="data_nascimento"
                    value={data_nascimento}
                    onChange={handleChange}
                    min="1900-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    required
                    className="px-3 py-2 bg-gray-100 border rounded text-neutra-preta text-base w-full"
                  />
                </div>

                {/* Informações Acadêmicas */}
                <h4 className="text-neutra-preta font-bold">Informações Acadêmicas</h4>
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

                {/* Modalidades: checkboxes baseadas em availableModalidades (ids) */}
                <h4 className="text-neutra-preta mb-2 font-bold">Modalidades</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableModalidades &&
                    availableModalidades.map((mod) => (
                      <label key={mod.id} className="flex items-center gap-2 accent-neutra-preta text-neutra-preta">
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
              </div>

              {/* Imagem de Perfil */}
              <h4 className="text-neutra-preta mb-2">Imagem de Perfil</h4>
              <div className="flex flex-col mb-2">
                <ProfileUploader file={file} onFileChange={setFile} />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-evenly px-[20%] mt-8">
          <div className="flex gap-5">
            {/* Botão Alterar */}
            <button
              type="submit"
              className="bg-secundaria text-neutra-branca px-6 py-2 rounded-md border 
              border-neutra-branca cursor-pointer transition-all duration-300 ease-in-out 
              font-semibold hover:bg-neutra-branca hover:text-secundaria hover:border-secundaria"
            >
              Alterar
            </button>

            {/* Botão Voltar */}
            <Link to="/adm">
              <button
                type="button"
                className="bg-destaque text-white px-6 py-2 rounded-lg border border-neutra-branca
                cursor-pointer transition-all duration-300 hover:bg-white hover:text-destaque
                hover:border-destaque"
              >
                Voltar
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
