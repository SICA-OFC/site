import { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.png";
import ProfilePhotoUploader from "../components/profilePhotoUploader.jsx";
import SelectCursos from "../components/selectCursos.jsx";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  const fetchedRef = useRef(false);
  const nomeRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;

    const verUsuario = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        const usuario = result.usuario;
        nomeRef.current = usuario.nome;
        setRm(usuario.rm);
        setNome(usuario.nome);
        setPeriodo(`${usuario.cursos.periodo}`);
        setEmail(usuario.email);
        setDataNascimento(new Date(usuario.data_nascimento).toISOString().split("T")[0]);
        setTelefone(usuario.telefone);
        setCurso(usuario.curso_id);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    verUsuario();
    fetchedRef.current = true;
  }, [BASE_URL]);

  const navigate = useNavigate();

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

    const userInfo = {
      rm,
      nome,
      email,
      data_nascimento: new Date(data_nascimento),
      telefone,
      curso_id: parseInt(curso),
    };

    const response = await fetch(`${BASE_URL}/usuario/editar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const result = await response.json();
    console.log("Resposta do servidor:", result.usuario);
    if (response.ok) {
      navigate("/editar-perfil", {
        state: { accessToken: result.accessToken },
      });
    } else {
      throw new Error(result.message || "Erro no cadastro");
    }
  };

  return (
    <div
      className="font-montserrat flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("../assets/PerfilPageBG.png")' }}
    >
      <div className="flex max-w-[70vw] w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col gap-2 p-10 flex-1">
          <div className="flex justify-evenly w-[250px] mb-12">
            <div className="flex items-center mb-0.5">
              <img src={Logo} alt="Logo SICA" className="w-10 h-10 mr-0.5" />
            </div>
            <div className="border-l border-[#092843] mx-5" />
            <h2 className="text-[#092843] self-center">Editar Perfil</h2>
          </div>

          <h3 className="text-[#092843] mb-2">Olá, {nomeRef.current || "Usuário"}</h3>
          <div className="border-t border-[#092843] w-full mb-5" />

          <form action="#" onSubmit={handleSubmit} method="post" className="flex gap-[10%] w-full">
            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-2 w-2/5">
                {/* Dados Pessoais */}
                <section className="relative">
                  <h4 className="text-[#001429] mb-2">Dados Pessoais</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="rm" className="mb-1 text-[#001429]">
                      RM
                    </label>
                    <input
                      type="text"
                      id="rm"
                      name="rm"
                      value={rm}
                      onChange={handleRmChange}
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
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
                      maxLength="11"
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
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    />
                  </div>
                </section>

                {/* Informações Acadêmicas */}
                <section className="relative mt-6">
                  <h4 className="text-[#001429] mb-2">Informações Acadêmicas</h4>
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
                </section>

                {/* Modalidades */}
                <section className="relative mt-6">
                  <h4 className="text-[#001429] mb-2">Modalidades</h4>
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
                </section>
              </div>

              <div className="flex flex-col gap-2 w-2/5">
                {/* Imagem de Perfil */}
                <section className="relative">
                  <h4 className="text-[#001429] mb-2">Imagem de Perfil</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="imagemPerfil" className="mb-1 text-[#001429]">
                      Imagem de Perfil
                    </label>
                    <ProfilePhotoUploader />
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
