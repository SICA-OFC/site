import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";
import ProfileUploader from "../../components/ProfileUploader.jsx";
import SelectCursos from "../../components/selectCursos.jsx";
import { Bounce, toast } from "react-toastify";

function ClickableUserEntry({ name, rm, course, modality }) {
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">
        {name} | {rm} | {course} | {modality}
      </span>
    </p>
  );
}

export default function ManagementUsersPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Estados
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

  const fetchedRef = useRef(false);
  const nomeRef = useRef(false);

  function ChangeForm(usuario) {
    nomeRef.current = usuario.nome;
    setId(usuario.id);
    setRm(usuario.rm);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setDataNascimento(
      new Date(usuario.data_nascimento).toISOString().split("T")[0]
    );
    setTelefone(usuario.telefone);
    setPeriodo(`${usuario.cursos.periodo}`);
    setCurso(usuario.curso_id);
    setFile(usuario.foto_perfil || null);
  }

  useEffect(() => {
    if (fetchedRef.current) return;

    const verUsuario = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/verUsuarios`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();

        if (response.ok) {
          const usuarios = result.usuarios;

          if (usuarios.length > 0) {
            setUsers(usuarios);
            
            const primeiro = usuarios[0];
            setSelectedUser(primeiro);
            ChangeForm(primeiro);
          }
        } else {
          toast.error(result.erro, toastSettings);
        }
      } catch (error) {
        toast.error(
          "Algo deu errado ao consultar os alunos! Tente novamente!",
          toastSettings
        );
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    verUsuario();
    fetchedRef.current = true;
  }, [BASE_URL]);

  useEffect(() => {
    if (selectedUser) {
      ChangeForm(selectedUser);
    }
  }, [selectedUser]);

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
    setDataNascimento(e.target.value);
  }

  function handleTelefoneChange(e) {
    setTelefone(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rm", rm);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("data_nascimento", new Date(data_nascimento).toISOString());
    formData.append("telefone", telefone);
    formData.append("curso_id", parseInt(curso));

    if (file) {
      formData.append("photo", file);
    }

    const response = await fetch(`${BASE_URL}/usuario/editar/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.mensagem, toastSettings);
      nomeRef.current = nome;
    } else {
      throw new Error(result.message || "Erro na edição");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-montserrat">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-[80%] max-w-[1200px] shadow-md rounded"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
            <div className="border-l border-[#0c2442] w-[10px] h-[50px]"></div>
            <h1 className="text-lg font-[energy] mt-5">
              Área do Administrador
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8 h-[60vh]">
          {/* Lista de usuários */}
          <div className="h-[85%] w-[50%]">
            <h2 className="text-lg font-[energy] border-b-2 border-b-black">
              VISUALIZAR ALUNOS
            </h2>
            <div className="w-full overflow-y-scroll flex flex-col">
              {users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className="cursor-pointer hover:bg-gray-100 p-1"
                >
                  <ClickableUserEntry
                    name={u.nome}
                    rm={u.rm}
                    course={u.cursos?.nome || "—"}
                    modality={u.modality || "—"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info do aluno selecionado */}
          <div className="h-[85%] w-[50%] overflow-y-scroll flex flex-col">
            <h2 className="text-xl font-bold  border-b-2 border-b-black font-[Energy]">
              {selectedUser ? selectedUser.nome : "ALUNO"}
            </h2>
            <div className="flex flex-col justify-around w-full gap-1 md:gap-2">
              {/* Dados Pessoais */}
              <h4 className="text-[#001429] font-bold">Dados Pessoais</h4>
              <div className="flex flex-col mb-2">
                <input type="hidden" name="id" value={id} />
                <label htmlFor="rm" className="mb-1 text-[#001429]">
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
                  onChange={handleRmChange}
                  disabled
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#aaa] text-base w-full"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="name" className="mb-1 text-[#001429]">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={nome}
                  onChange={handleNomeChange}
                  required
                  autoComplete="name"
                  pattern="[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*"
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="mb-1 text-[#001429]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="email"
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="telefone" className="mb-1 text-[#001429]">
                  Telefone
                </label>
                <input
                  type="text"
                  maxLength="19"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  required
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="dataNascimento" className="mb-1 text-[#001429]">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  value={data_nascimento}
                  onChange={handleDataChange}
                  min="2000-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  required
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                />
              </div>

              {/* Informações Acadêmicas */}
              <h4 className="text-[#001429] font-bold">
                Informações Acadêmicas
              </h4>
              <div className="flex flex-col mb-2">
                <label htmlFor="curso" className="mb-1 text-[#001429]">
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
                <label htmlFor="modalidades" className="mb-1 text-[#001429]">
                  Modalidades
                </label>
                <select
                  id="modalidades"
                  name="modalidades"
                  required
                  className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                >
                  <option value="futebol">Futebol</option>
                  <option value="volei">Vôlei</option>
                  <option value="basquete">Basquete</option>
                  <option value="natacao">Natação</option>
                </select>
              </div>

              {/* Imagem de Perfil */}
              <h4 className="text-[#001429] mb-2">Imagem de Perfil</h4>
              <div className="flex flex-col mb-2">
                <ProfileUploader file={file} onFileChange={setFile} />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-evenly px-[20%] mt-8">
          <button className="bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border-[#0c2442] transition cursor-pointer">
            Alterar
          </button>
          <Link to="/adm">
            <button className="bg-[#f18e2c] text-[#001429] py-3 px-6 rounded border border-[#f18e2c] hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border-[#f18e2c] transition cursor-pointer">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
