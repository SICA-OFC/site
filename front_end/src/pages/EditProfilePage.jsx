import { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.png";
import ProfileUploader from "../components/ProfileUploader.jsx";
import SelectCursos from "../components/selectCursos.jsx";
import { toast, ToastContainer, Bounce} from "react-toastify";

export default function EditProfilePage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  {
    isLoading ? "" : "";
  }

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
        setEmail(usuario.email);
        setDataNascimento(new Date(usuario.data_nascimento).toISOString().split("T")[0]);
        setTelefone(usuario.telefone);
        setPeriodo(`${usuario.cursos.periodo}`);
        setCurso(usuario.curso_id);
        setFile(usuario.foto_perfil || null);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    verUsuario();
    fetchedRef.current = true;
  }, [BASE_URL]);

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
    setIsLoading(true);
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

    const response = await fetch(`${BASE_URL}/usuario/editar`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();
    console.log("Resposta do servidor:", result);
    if (response.ok) {
      toast.success(result.mensagem, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
      nomeRef.current = nome;
      setIsLoading(false);
    } else {
      throw new Error(result.message || "Erro no cadastro");
    }
  };

  return (
    <div
      className="font-montserrat flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: Logo }}
    >
      <div className="flex max-w-[70vw] w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col gap-1 p-5 flex-1">
          <div className="flex gap-2 w-[250px]">
            <div className="flex items-center mb-0.5">
              <img src={Logo} alt="Logo SICA" className="w-10 h-10 mr-0.5" />
            </div>
            <div className="border-l border-[#092843]" />
            <h2 className="text-[#092843] self-center">Editar Perfil</h2>
          </div>

          <h3 className="text-[#092843] text-2xl">Olá, {nomeRef.current || "Usuário"}.</h3>
          <div className="border-t border-[#092843] w-full" />

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
              <div className="flex flex-col md:flex-row justify-around w-full gap-5 md:gap-0">
                <div className="flex flex-col gap-2 w-full md:w-2/5">
                  {/* Dados Pessoais */}
                  <section className="relative">
                    <h4 className="text-[#001429] mb-2 font-bold">Dados Pessoais</h4>
                    <div className="flex flex-col mb-2">
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
                  </section>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-2/5">
                  {/* Informações Acadêmicas */}
                  <section className="relative">
                    <h4 className="text-[#001429] mb-2 font-bold">Informações Acadêmicas</h4>
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
                  <section className="relative">
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
                  {/* Imagem de Perfil */}
                  <section className="relative">
                    <h4 className="text-[#001429] mb-2">Imagem de Perfil</h4>
                    <div className="flex flex-col mb-2">
                      <ProfileUploader file={file} onFileChange={setFile} />
                    </div>
                  </section>
                </div>
              </div>
              <button
                className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-[30%] hover:bg-neutra-branca hover:text-[#001429] hover:border-secundaria hover:border-1 hover:cursor-pointer transition"
                type="submit"
                name="submit"
                value="login"
              >
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
