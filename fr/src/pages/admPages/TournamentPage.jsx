import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastSettings } from "../../utils/toastSettings";
import { BASE_URL } from "../../utils/enviromentSettings";
import { HandleIsAdmin } from "../../utils/handleIsAdmin";
import { verTimes, verUsuários } from "../../hooks/api";

function ClickableUserEntry({ name, rm, course, modality }) {
  const parts = [name, rm, course, modality].filter(Boolean);
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{parts.join(" | ")}</span>
    </p>
  );
}

export default function TournmentCreatorPage() {
  const navigate = useNavigate();

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      const isAdmin = await HandleIsAdmin(navigate);
      if (isAdmin) {
        HandleUsers();
        HandleTeams();
        verCampeonatos();
      }
    })();
  }, []);

  const [tournaments, setTournaments] = useState([]);

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [chaveamento, setChaveamento] = useState("");

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("single elimination");
  const [modalidade, setModalidade] = useState({
    Futebol: false,
    Vôlei: false,
    Basquete: false,
    Natação: false,
  });

  const modalidades = {
    Futebol: false,
    Vôlei: false,
    Basquete: false,
    Natação: false,
  }

  const [editNome, setEditNome] = useState("");
  const [editTipo, setEditTipo] = useState("single elimination");
  const [selectedTournament, setSelectedTournament] = useState("");
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    const setters = {
      nome: setNome,
      tipo: setTipo,
      editNome: setEditNome,
      editTipo: setEditTipo,
      modalidade: setModalidade,
    };
    setters[name]?.(value);
  }

  function toggleTeamId(id) {
    setSelectedTeamIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const HandleUsers = async () => {
    const result = await verUsuários();

    if (result && result.usuarios && result.usuarios.length > 0) {
      const usuarios = result.usuarios;
      setUsers(usuarios);
    } else {
      setUsers([]);
    }
  };

  const HandleTeams = async () => {
    const result = await verTimes();

    if (result) {
      const teams = result.times;
      setTeams(teams);
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
      toast.error("Algo deu errado ao consultar os campeonatos! Tente novamente!", toastSettings);
      console.error("Erro ao verificar autenticação:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentInfo = {
      route: "tournaments.json",
      method: "POST",
      body: {
        name: nome,
        tournament_type: tipo,
        description: modalidade,
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

    const tournamentInfo2 = {
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
    <div className="min-h-screen bg-[url('/assets/AdmBG.png')] bg-cover bg-center flex flex-col gap-5 py-5 items-center justify-center">
      {/* Card de Criação */}
      <div className="bg-neutra-branca rounded shadow-lg shadow-black/10 p-[2%] max-w-[500px] w-full flex flex-col items-center">
        {/* Cabeçalho */}
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-neutra-preta w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        {/* Formulário de Cadastro */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <label className="text-sm text-center w-full" htmlFor="nome">
              Nome do torneio
            </label>
            <input
              className="bg-neutra-branca border border-[#ddd] rounded-lg p-3 w-full"
              value={nome}
              onChange={handleChange}
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
              className="bg-neutra-branca border border-[#ddd] rounded-lg p-3 w-full"
              value={tipo}
              id="tipo"
              name="tipo"
              onChange={handleChange}
              required
            >
              <option value="single elimination">Eliminação</option>
            </select>

            {Object.keys(modalidades).map((mod) => (
              <label key={mod} className="flex flex-row gap-2 mt-2">
                <input type="radio" name="modalidade" value={mod} onChange={handleChange} />
                {mod}
              </label>
            ))}
          </div>

          {/* Botões */}
          <div className="flex justify-center gap-5 mt-8">
            <button
              type="submit"
              className="bg-neutra-preta text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
            >
              Cadastrar Torneio
            </button>

            <Link to="/adm">
              <button
                type="button"
                className="bg-destaque text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>

      {/* Card de Edição */}
      <div className="bg-neutra-branca rounded shadow-lg shadow-black/10 p-[2%] max-w-[500px] w-full flex flex-col items-center">
        {tournaments?.length > 0 ? (
          <form onSubmit={handleEdit} className="w-full">
            <div className="w-full">
              <label className="text-sm text-center w-full" htmlFor="nome">
                Campeonatos
              </label>

              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {tournaments.map((t) => (
                  <div
                    key={t.tournament.id}
                    onClick={() => {
                      setSelectedTournament(t.tournament);
                      setEditNome(t.tournament.name || "");
                      setChaveamento(t.tournament.participants_count !== 0 ? t.tournament.live_image_url : "");
                    }}
                    className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <ClickableUserEntry name={t.tournament.name || ""} />
                    </div>
                  </div>
                ))}
              </div>

              {chaveamento && (
                <img
                  src={chaveamento}
                  className="w-full max-h-[200px] object-cover object-center rounded mt-3"
                  alt="Chaveamento"
                />
              )}

              <label className="text-sm text-center w-full mt-3" htmlFor="editNome">
                Nome do Campeonato
              </label>
              <input
                className="bg-neutra-branca border border-[#ddd] rounded-lg p-3 w-full"
                value={editNome}
                onChange={handleChange}
                type="text"
                id="editNome"
                name="editNome"
                required
              />

              <label className="text-sm text-center w-full mt-2" htmlFor="tipo">
                Tipo de torneio
              </label>
              <select
                className="bg-neutra-branca border border-[#ddd] rounded-lg p-3 w-full"
                value={editTipo}
                id="tipo"
                name="editTipo"
                onChange={handleChange}
                required
              >
                <option value="single elimination">Eliminação</option>
              </select>

              <label className="text-sm text-center w-full mt-2" htmlFor="modalidade">
                Modalidade
              </label>
              <input
                type="text"
                className="bg-neutra-branca text-[#aaa] border border-[#ddd] rounded-lg p-3 w-full"
                value={
                  typeof selectedTournament?.description === "string"
                    ? selectedTournament.description.charAt(0).toUpperCase() + selectedTournament.description.slice(1)
                    : ""
                }
                id="modalidade"
                disabled
              />

              <label className="text-sm text-center w-full mt-2" htmlFor="tipo">
                Times
              </label>

              <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                {teams.map((t) => (
                  <div key={t.id} className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={selectedTeamIds.includes(t.id)}
                        onChange={(ev) => {
                          ev.stopPropagation();
                          toggleTeamId(t.id);
                        }}
                        className="w-4 h-4 accent-neutra-preta"
                      />
                      <ClickableUserEntry name={t.nome} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs mt-2">Selecionados: {selectedTeamIds.length}</p>
            </div>

            {/* Botões */}
            <div className="flex justify-center gap-5 mt-8">
              <button
                type="submit"
                className="bg-neutra-preta text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
              >
                Atualizar Campeonato
              </button>

              <button
                onClick={handleDelete}
                type="button"
                className="bg-red-600 text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-red-600 hover:border-red-600"
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
