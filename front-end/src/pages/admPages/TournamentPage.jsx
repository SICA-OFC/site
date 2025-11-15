import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HandleIsAdmin } from "../../utils/handleIsAdmin";
import {
  adicionarParticipantes,
  criarCampeonato,
  deletarCampeonato,
  editarCampeonato,
  removerParticipantes,
  verCampeonatos,
  verModalidades,
  verTimes,
  verUsuários,
} from "../../hooks/api";

function ClickableUserEntry({ name, rm, course, modality }) {
  const parts = [name, rm, course, modality].filter(Boolean);
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{parts.join(" | ")}</span>
    </p>
  );
}

export default function TournamentCreatorPage() {
  const navigate = useNavigate();

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    HandleLoading();
  }, []);

  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [availableModalidades, setAvailableModalidades] = useState([]);

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("single elimination");
  const [modalidade, setModalidade] = useState("");

  const [selectedTournament, setSelectedTournament] = useState("");
  const [editNome, setEditNome] = useState("");
  const [editTipo, setEditTipo] = useState("single elimination");
  const [chaveamento, setChaveamento] = useState("");
  const [chaveamentoTs, setChaveamentoTs] = useState(Date.now());
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    const setters = {
      nome: setNome,
      tipo: setTipo,
      modalidade: setModalidade,
      editNome: setEditNome,
      editTipo: setEditTipo,
    };
    setters[name]?.(value);
  }

  function toggleTeamId(id) {
    setSelectedTeamIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const HandleLoading = async () => {
    const isAdmin = await HandleIsAdmin(navigate);
    if (!isAdmin) return;

    const result = await verTimes();
    const { modalidades } = await verModalidades();
    const campeonatos = await verCampeonatos();

    if (modalidades) {
      setAvailableModalidades(modalidades);
    }

    if ((result.total = 0)) {
      setTeams(null);
    } else {
      setTeams(result.times);
    }

    if ((campeonatos.total = 0)) {
      setTournaments();
    } else {
      setTournaments(campeonatos);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await criarCampeonato({
      name: nome,
      tournament_type: tipo,
      description: modalidade,
    });

    if (!result.error) {
      setNome("");
      setChaveamento();
      setTournaments(await verCampeonatos());
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const result = await editarCampeonato(
      {
        name: editNome,
        tournament_type: editTipo,
      },
      selectedTournament.id
    );

    const participants = teams
      .filter((t) => selectedTeamIds.includes(t.id))
      .map((t, index) => ({
        name: t.nome,
        seed: index + 1,
        misc: t.id,
      }));

    await removerParticipantes(selectedTournament.id);

    const result2 = await adicionarParticipantes({ participants }, selectedTournament.id);

    if (result && result2) {
      setNome("");
      setChaveamentoTs(Date.now());
      setTournaments(await verCampeonatos());
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const result = await deletarCampeonato(selectedTournament.id);

    if (result) {
      setNome("");
      setChaveamento("");
      setTournaments(await verCampeonatos());
    }
  };

  function buildChaveamentoUrl(url) {
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}t=${chaveamentoTs}`;
  }

  return (
    <div className="min-h-screen bg-[url('/assets/AdmBG.png')] bg-cover bg-center flex flex-col gap-5 py-5 items-center justify-center">
      {/* Card de Criação */}
      <div className="bg-neutra-branca rounded shadow-lg shadow-black/10 p-[2%] max-w-[500px] w-full flex flex-col items-center">
        {/* Cabeçalho */}
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-20" />
          <div className="border-l border-neutra-preta w-2.5 h-[60px] mx-4"></div>
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

            <label className="text-sm text-center w-full" htmlFor="tipo">
              Modalidade
            </label>
            <select
              id="modalidade"
              name="modalidade"
              value={modalidade}
              onChange={handleChange}
              className="bg-neutra-branca border border-[#ddd] rounded-lg p-3 w-full"
            >
              <option value="">Selecione uma modalidade</option>
              {availableModalidades.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.nome}
                </option>
              ))}
            </select>
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
                    className={`cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between ${
                      selectedTournament?.id === t.tournament.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ClickableUserEntry name={t.tournament.name || ""} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Só mostra os campos de edição se tiver um torneio selecionado */}
              {selectedTournament && (
                <>
                  {chaveamento && (
                    <img
                      src={buildChaveamentoUrl(chaveamento)}
                      className="w-full h-60 object-[left 140px] object-cover object-center rounded mt-3"
                      alt="Chaveamento"
                    />
                  )}

                  <label className="text-sm text-center w-full mt-3" htmlFor="editNome">
                    Nome do Campeonato
                  </label>
                  <input
                    className={`
                      bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full 
                      ${selectedTournament.state === "underway" ? "text-[#aaa]" : ""}
                    `}
                    value={editNome}
                    onChange={handleChange}
                    type="text"
                    id="editNome"
                    name="editNome"
                    required={selectedTournament.state !== "underway"}
                    disabled={selectedTournament.state === "underway"}
                  />

                  <label className="text-sm text-center w-full mt-2" htmlFor="tipo">
                    Tipo de torneio
                  </label>
                  <select
                    className={`
                      bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full 
                      ${selectedTournament.state === "underway" ? "text-[#aaa]" : ""}
                    `}
                    value={editTipo}
                    id="tipo"
                    name="editTipo"
                    onChange={handleChange}
                    required={selectedTournament.state !== "underway"}
                    disabled={selectedTournament.state === "underway"}
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
                      parseInt(selectedTournament?.description)
                        ? availableModalidades[parseInt(selectedTournament.description)]?.nome || ""
                        : ""
                    }
                    id="modalidade"
                    disabled
                  />

                  {selectedTournament.state == "pending" ? (
                    <>
                      <label className="text-sm text-center w-full mt-2" htmlFor="tipo">
                        Times
                      </label>
                      <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
                        {teams && teams.length > 0 ? (
                          teams.map((t) => (
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
                                  className="w-4 h-4 accent-neutra-preta"
                                />
                                <ClickableUserEntry name={t.nome} />
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-sm text-gray-500 mt-2">Sem times</p>
                        )}
                      </div>

                      <p className="text-xs mt-2">Selecionados: {selectedTeamIds.length}</p>
                      {/* Botões de ação */}
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
                    </>
                  ) : selectedTournament.state == "underway" ? (
                    <div className="bg-neutra-branca rounded font-bold shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
                      Torneio em Andamento
                    </div>
                  ) : (
                    selectedTournament.state == "complete" && (
                      <div className="bg-neutra-branca rounded font-bold shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
                        Torneio Finalizado
                        <button
                          onClick={handleDelete}
                          className="bg-red-600 text-white font-normal px-6 py-2 rounded-lg border-neutra-branca 
                hover:bg-white hover:text-red-600 border hover:border-red-600 transition 
                cursor-pointer"
                        >
                          Deletar Torneio
                        </button>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </form>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-2">Sem torneios</p>
        )}
      </div>
    </div>
  );
}
