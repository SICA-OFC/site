import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function ClickableUserEntry({ name, rm, course, modality }) {
  const parts = [name, rm, course, modality].filter(Boolean);
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{parts.join(" | ")}</span>
    </p>
  );
}

export default function TournmentCreatorPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const fetchedRef = useRef(false);
  const [tournaments, setTournaments] = useState([]);

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [chaveamento, setChaveamento] = useState("");

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("single elimination");

  const [editNome, setEditNome] = useState("");
  const [editTipo, setEditTipo] = useState("single elimination");
  const [selectedTournament, setSelectedTournament] = useState("");
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

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

  function handleNomeChange(e) {
    setNome(e.target.value);
  }

  function handleTipoChange(e) {
    setTipo(e.target.value);
  }

  function handleEditNomeChange(e) {
    setEditNome(e.target.value);
  }

  function handleEditTipoChange(e) {
    setEditTipo(e.target.value);
  }

  function toggleTeamId(id) {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

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

  const verCampeonatos = async () => {
    const tournamentInfo = {
      route: "tournaments.json",
      method: "GET",
    };

    try {
      const response = await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setTournaments(result);
      } else {
        toast.error(result.erro, toastSettings);
      }
    } catch (error) {
      toast.error(
        "Algo deu errado ao consultar os campeonatos! Tente novamente!",
        toastSettings
      );
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;

    verUsuario();
    verTimes();
    verCampeonatos();
    fetchedRef.current = true;
  }, [BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentInfo = {
      route: "tournaments.json",
      method: "POST",
      body: {
        name: nome,
        tournament_type: tipo,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        setNome("");
        setChaveamento();
        verCampeonatos();
        toast.success("Torneio criado com sucesso!", toastSettings);
      } else {
        toast.error("Erro ao criar o torneio", toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao criar o torneio. Tente novamente!", toastSettings);
      console.error("Erro ao criar o torneio:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const tournamentInfo = {
      route: `tournaments/${selectedTournament.id}.json`,
      method: "PATCH",
      body: {
        name: editNome,
        tournament_type: editTipo,
      },
    };

    const participants = teams
      .filter((t) => selectedTeamIds.includes(t.id))
      .map((t, index) => ({
        name: t.nome,
        seed: index + 1,
      }));
      
      const tournamentInfo2= {
        route: `tournaments/${selectedTournament.id}/participants/clear.json`,
        method: "DELETE",
      };
      
      const tournamentInfo3 = {
        route: `tournaments/${selectedTournament.id}/participants/bulk_add.json`,
        method: "POST",
        body: { participants },
      };
    try {
      const response = await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo),
        credentials: "include",
      });
      
      await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo2),
        credentials: "include",
      });

      const response3 = await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo3),
        credentials: "include",
      });

      const result = await response.json();
      const result3 = await response3.json();
      console.log(result3);
      if (response.ok && response3.ok) {
        setNome("");
        verCampeonatos();
        toast.success("Torneio editado com sucesso!", toastSettings);
      } else {
        toast.error("Erro ao editar o torneio", toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao editar o torneio. Tente novamente!", toastSettings);
      console.error("Erro ao editar o torneio:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const tournamentInfo = {
      route: `tournaments/${selectedTournament.id}.json`,
      method: "DELETE",
    };

    try {
      const response = await fetch(`${BASE_URL}/chaveamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentInfo),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        setNome("");
        setChaveamento("");
        verCampeonatos();
        toast.success("Torneio deletado com sucesso!", toastSettings);
      } else {
        toast.error("Erro ao deletar o torneio", toastSettings);
      }
    } catch (error) {
      toast.error("Erro ao deletar o torneio. Tente novamente!", toastSettings);
      console.error("Erro ao deletar o torneio:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col gap-5 py-5 items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        {/* Cabeçalho */}
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-neutra-preta w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <label className="text-sm text-center w-full" htmlFor="nome">
              Nome do torneio
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
            <label className="text-sm text-center w-full" htmlFor="tipo">
              Tipo de torneio
            </label>
            <select
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={tipo}
              id="tipo"
              onChange={handleTipoChange}
              required
            >
              <option value="single elimination">Eliminação</option>
            </select>
          </div>
          {/* Botões */}
          <div className="flex justify-center gap-5 mt-8">
            <button
              type="submit"
              className="bg-neutra-preta text-white px-6 py-2 rounded-lg border-neutra-branca hover:bg-white hover:text-neutra-preta border hover:border-neutra-preta transition cursor-pointer"
            >
              Cadastrar Torneio
            </button>
            <Link to="/adm">
              <button
                type="back"
                className="bg-destaque text-white px-6 py-2 rounded-lg border-neutra-branca hover:bg-white hover:text-[red] border transparent hover:border-[red] transition cursor-pointer"
              >
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>

      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        {tournaments?.length > 0 ? (
          <form onSubmit={handleEdit} className="w-full">
            <div className="w-full">
              <label className="text-sm text-center w-full" htmlFor="nome">
                Campeonatos
              </label>
              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {tournaments?.map((t) => (
                  <div
                    key={t.tournament.id}
                    onClick={() => {
                      setSelectedTournament(t.tournament);
                      setEditNome(t.tournament.name || "");
                      setChaveamento(t.tournament.live_image_url || "");
                    }}
                    className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <ClickableUserEntry name={t.tournament.name || ""} />
                    </div>
                  </div>
                ))}
              </div>
              <img
                src={`${chaveamento}`}
                className="w-full h-[200px] object-cover object-center rounded"
                width="100%"
                height="300"
                frameborder="0"
                scrolling="auto"
                allowtransparency="true"
              ></img>

              <label className="text-sm text-center w-full" htmlFor="editNome">
                Nome do Campeonato
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
                Tipo de torneio
              </label>
              <select
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={editTipo}
                id="tipo"
                onChange={handleEditTipoChange}
                required
              >
                <option value="single elimination">Eliminação</option>
              </select>
              <label className="text-sm text-center w-full" htmlFor="tipo">
                Times
              </label>

              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {teams.map((t) => (
                  <div
                    key={t.id}
                    className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={selectedTeamIds.includes(t.id)}
                        onChange={(ev) => {
                          ev.stopPropagation();
                          toggleTeamId(t.id);
                        }}
                        className="w-4 h-4"
                      />
                      <ClickableUserEntry name={t.nome} />
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
                className="bg-neutra-preta text-white px-6 py-2 rounded-lg border-neutra-branca hover:bg-white hover:text-neutra-preta border hover:border-neutra-preta transition cursor-pointer"
              >
                Atualizar Campeonato
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="bg-[red] text-white px-6 py-2 rounded-lg border-neutra-branca hover:bg-white hover:text-[red] border transparent hover:border-[red] transition cursor-pointer"
              >
                Deletar Campeonato
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-2">Sem torneios</p>
        )}
      </div>
    </div>
  );
}
