import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatTelefone } from "../../utils/sanitization.js";
import Logo from "../../assets/logo.png";
import ProfileUploader from "../../components/ProfileUploader.jsx";
import SelectCursos from "../../components/selectCursos.jsx";
import { BASE_URL } from "../../utils/enviromentSettings.js";
import { HandleIsAdmin } from "../../utils/handleIsAdmin.js";
import { EditarUsuário, verUsuários } from "../../hooks/api.js";

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
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [file, setFile] = useState("");
  const [modalidades, setModalidades] = useState({
    Futebol: false,
    Vôlei: false,
    Basquete: false,
    Natação: false,
  });
  const [filtro, setFiltro] = useState(false);


  const nomeRef = useRef(false);
  function ChangeForm(usuario) {
    nomeRef.current = usuario.nome;
    setId(usuario.id);
    setRm(usuario.rm);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setDataNascimento(new Date(usuario.data_nascimento).toISOString().split("T")[0]);
    setTelefone(usuario.telefone);
    setPeriodo(`${usuario.cursos.periodo}`);
    setCurso(usuario.curso_id);
    setFile(usuario.foto_perfil || null);
    const userModalidades = JSON.parse(usuario.modalidades) || {};
    setModalidades({
      Futebol: !!userModalidades.Futebol,
      Vôlei: !!userModalidades.Vôlei,
      Basquete: !!userModalidades.Basquete,
      Natação: !!userModalidades.Natação,
    });
  }

  const HandleUsers = async () => {
    const result = await verUsuários();

    if (result && result.usuarios && result.usuarios.length > 0) {
      const usuarios = result.usuarios;
      setUsers(usuarios);
      setSelectedUser(usuarios[0]);
    } else {
      setUsers([]);
      setSelectedUser(null);
    }
  };

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    (async () => {
      const isAdmin = await HandleIsAdmin(navigate);
      if (isAdmin) await HandleUsers();
    })();
  }, [BASE_URL]);

  useEffect(() => {
    if (selectedUser) {
      ChangeForm(selectedUser);
    }
  }, [selectedUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    const setters = {
      rm: setRm,
      nome: setNome,
      email: setEmail,
      data_nascimento: setDataNascimento,
      telefone: (v) => setTelefone(formatTelefone(v)),
    };
    setters[name]?.(value);
  }

  const handleModalidadeChange = (e) => {
    const { value, checked } = e.target;
    setModalidades((prev) => ({ ...prev, [value]: checked }));
  };

  const handleFiltroChange = (e) => {
    const value = e.target.value;
    setFiltro(value);
    if (!value) {
      setSelectedUser(users[0]);
      return;
    }

    const filtredUsers = users.filter((u) => {
      const userModalidades = JSON.parse(u.modalidades || "{}");
      return !!userModalidades[value];
    });
    setSelectedUser(filtredUsers[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("rm", rm);
    data.append("nome", nome);
    data.append("email", email);
    data.append("data_nascimento", data_nascimento);
    data.append("telefone", telefone);
    data.append("curso_id", parseInt(curso));
    data.append("modalidades", JSON.stringify(modalidades));

    if (file) {
      data.append("photo", file);
    }

    const result = await EditarUsuário(data, id)
    if (result) {
      nomeRef.current = nome;
      HandleUsers();
    } else {
      throw new Error(result.message || "Erro na edição");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-montserrat">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-[80%] max-w-[1200px] shadow-md rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
            <div className="border-l border-neutra-pretaw-[10px] h-[50px]"></div>
            <h1 className="text-lg font-[energy] mt-5">Área do Administrador</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8 h-[60vh]">
          {/* Lista de usuários */}
          <div className="h-[85%] w-[50%]">
            <h2 className="text-lg font-[energy] border-b-2 border-b-black">VISUALIZAR ALUNOS</h2>
            <div className="flex flex-col h-full justify-between">
              <div className="w-full max-h-[80%] overflow-y-scroll flex flex-col">
                {users
                  .filter((u) => {
                    if (!filtro) return true;
                    const userModalidades = JSON.parse(u.modalidades || "{}");
                    return !!userModalidades[filtro];
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
                  className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                >
                  <option value="">Selecione uma modalidade</option>
                  {Object.keys(modalidades).map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Info do aluno selecionado */}
          <div className="h-[85%] w-[50%] flex flex-col">
            <h2 className="text-xl font-bold  border-b-2 border-b-black font-[Energy]">
              {selectedUser ? selectedUser.nome : "ALUNO"}
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
                    className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#aaa] text-base w-full"
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
                    maxLength="19"
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

                {/* Modalidades */}
                <div className="flex flex-col mb-2">
                  {Object.keys(modalidades).map((mod) => (
                    <label key={mod} className="block mb-1">
                      <input type="checkbox" value={mod} name="modalidades" checked={modalidades[mod]} onChange={handleModalidadeChange} />
                      {mod}
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
