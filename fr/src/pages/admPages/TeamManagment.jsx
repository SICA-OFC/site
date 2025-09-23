import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function ClickableUserEntry({ name, rm, course }) {
  const parts = [name, rm, course].filter(Boolean);
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{parts.join(" | ")}</span>
    </p>
  );
}

export default function TournmentCreatorPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const fetchedRef = useRef(false);

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [nome, setNome] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const [editNome, setEditNome] = useState("");
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [modalidades, setModalidades] = useState({
    futebol: false,
    vôlei: false,
    basquete: false,
    natação: false,
  });
  const [filtro, setFiltro] = useState(false);


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

  const verTimes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/time`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        const teams = result.times;
        setTeams(teams);
      } else {
        toast.error(result.erro, toastSettings);
      }
    } catch (error) {
      toast.error(
        "Algo deu errado ao consultar os times! Tente novamente!",
        toastSettings
      );
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;

    verUsuario();
    verTimes();
    fetchedRef.current = true;
  }, [BASE_URL]);

  function handleNomeChange(e) {
    setNome(e.target.value);
  }

  function handleEditNomeChange(e) {
    setEditNome(e.target.value);
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  };

  function toggleUserId(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function toggleEditUserId(id) {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedIds.length === 0) {
      toast.warn("Selecione pelo menos um usuário para o time.", toastSettings);
      return;
    }

    const timeInfo = {
      nome,
      member_ids: selectedIds,
    };

    try {
      const response = await fetch(`${BASE_URL}/time`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timeInfo),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Time criado com sucesso!", toastSettings);
        setSelectedIds([]);
        setNome("");
        verTimes();
      } else {
        toast.error(result.erro, toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao criar o time. Tente novamente!", toastSettings);
      console.error("Erro ao criar o time:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (selectedTeamIds.length === 0) {
      toast.warn("Selecione pelo menos um usuário para o time.", toastSettings);
      return;
    }

    const timeInfo = {
      nome: editNome,
      member_ids: selectedTeamIds,
    };

    try {
      const response = await fetch(`${BASE_URL}/time/${selectedTeam.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timeInfo),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Time atualizado com sucesso!", toastSettings);
        verTimes();
      } else {
        console.log(result);
        toast.error("Erro ao atualizar o time", toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao atualizar o time. Tente novamente!", toastSettings);
      console.error("Erro ao atualizar o time:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/time/${selectedTeam.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Time deletado com sucesso!", toastSettings);
        setSelectedTeamIds([]);
        setEditNome("");
        verTimes();
      } else {
        toast.error(result.erro, toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao deletar o time. Tente novamente!", toastSettings);
      console.error("Erro ao deletar o time:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col gap-5 py-5 items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-[#f5f5f5] rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        {/* Cabeçalho */}
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <label className="text-sm text-center w-full" htmlFor="nome">
              Nome do time
            </label>
            <input
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={nome}
              onChange={handleNomeChange}
              type="text"
              id="nome"
              name="nome"
              pattern="[a-zA-Z0-9\u00C0-\u024F\s-]+"
              required
            />
            <label className="text-sm text-center w-full" htmlFor="tipo">
              Membros
            </label>

            <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
              {users.filter((u) => {
                if (!filtro) return true;
                const userModalidades = JSON.parse(u.modalidades || "{}");
                return !!userModalidades[filtro];
              }).map((u) => (
                <div
                  key={u.id}
                  className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={selectedIds.includes(u.id)}
                      onChange={(ev) => {
                        ev.stopPropagation();
                        toggleUserId(u.id);
                      }}
                      className="w-4 h-4"
                    />
                    <ClickableUserEntry
                      name={u.nome}
                      rm={u.rm}
                      course={u.cursos?.nome || "—"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* mostrar quantos selecionados (opcional) */}
            <p className="text-xs mt-2">Selecionados: {selectedIds.length}</p>
            <label className="text-sm text-center w-full" htmlFor="filtro">
              Modalidade
            </label>
            <select
              id="filtro"
              value={filtro}
              onChange={handleFiltroChange}
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
            >
              <option value="" disabled>Selecione uma modalidade</option>
              {Object.keys(modalidades).map((mod) => (
                <option key={mod} value={mod}>
                  {mod.charAt(0).toUpperCase() + mod.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* Botões */}
          <div className="flex justify-center gap-5 mt-8">
            <button
              type="submit"
              className="bg-[#001429] text-white px-6 py-2 rounded-lg border-[#f5f5f5] border cursor-pointer transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#001429";
                e.currentTarget.style.borderColor = "#001429";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#001429";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "#f5f5f5";
              }}
            >
              Cadastrar Time
            </button>
            <Link to="/adm">
              <button
                type="button"
                className="bg-destaque text-white px-6 py-2 rounded-lg border-[#f5f5f5] border cursor-pointer transition"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "red";
                  e.currentTarget.style.borderColor = "red";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F18E2C"; // cor do destaque
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "#f5f5f5";
                }}
              >
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>

      <div className="bg-[#f5f5f5] rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        {teams.length > 0 ? (
          <form onSubmit={handleEdit} className="w-full">
            <div className="w-full">
              <label className="text-sm text-center w-full" htmlFor="nome">
                Times
              </label>
              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {teams.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedTeam(t);
                      setEditNome(t.nome);
                      setSelectedTeamIds(
                        t.membros_time?.map((m) => m.membro_id) || []
                      );
                    }}
                    className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <ClickableUserEntry
                        name={t.nome}
                        modality={t.modality || "—"}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <label className="text-sm text-center w-full" htmlFor="editNome">
                Nome do time
              </label>
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={editNome}
                onChange={handleEditNomeChange}
                type="text"
                id="editNome"
                name="editNome"
                required
              />
              <label className="text-sm text-center w-full" htmlFor="tipo">
                Membros
              </label>

              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={selectedTeamIds.includes(u.id)}
                        onChange={(ev) => {
                          ev.stopPropagation();
                          toggleEditUserId(u.id);
                        }}
                        className="w-4 h-4"
                      />
                      <ClickableUserEntry name={u.nome} />
                    </div>
                  </div>
                ))}
              </div>

              {/* mostrar quantos selecionados (opcional) */}
              <p className="text-xs mt-2">
                Selecionados: {selectedTeamIds.length}
              </p>
            </div>
            {/* Botões */}
            <div className="flex justify-center gap-5 mt-8">
              <button
                type="submit"
                className="bg-[#001429] text-white px-6 py-2 rounded-lg border-[#f5f5f5] border cursor-pointer transition"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#001429";
                  e.currentTarget.style.borderColor = "#001429";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#001429";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "#f5f5f5";
                }}
              >
                Atualizar Time
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="bg-[red] text-white px-6 py-2 rounded-lg border-[#f5f5f5] border cursor-pointer transition"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "red";
                  e.currentTarget.style.borderColor = "red";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "red";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "#f5f5f5";
                }}
              >
                Deletar Time
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-2">Sem times</p>
        )}
      </div>
    </div>
  );
}
