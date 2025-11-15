import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { toastSettings } from "../../utils/toastSettings";
import { HandleIsAdmin } from "../../utils/handleIsAdmin";
import {
  comecarCampeonato,
  editarParticipantes,
  editarPartidas,
  finalizarCampeonato,
  resetarCampeonato,
  verCampeonatos,
  verModalidades,
  verParticipantes,
  verPartidas,
} from "../../hooks/api";

function ClickableUserEntry({ name }) {
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{name}</span>
    </p>
  );
}

export default function BracketEditorPage() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [availableModalidades, setAvailableModalidades] = useState([]);

  const [matches, setMatches] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participantMap, setParticipantMap] = useState({});

  const [seedSelections, setSeedSelections] = useState({});
  const [scoreInputs, setScoreInputs] = useState({});

  const [chaveamento, setChaveamento] = useState("");
  const [chaveamentoTs, setChaveamentoTs] = useState(Date.now());

  const navigate = useNavigate();

  const atualizarCampeonatos = async () => {
    const result = await verCampeonatos();
    setTournaments(result);
    if (!selectedTournament && Array.isArray(result) && result.length > 0) {
      setSelectedTournament(result[0].tournament);
      setChaveamento(result[0].tournament.live_image_url || "");
      setChaveamentoTs(Date.now());
    }
  };

  const HandleLoading = async () => {
    const isAdmin = await HandleIsAdmin(navigate);
    if (isAdmin) await atualizarCampeonatos();
    const { modalidades } = await verModalidades();

    if (modalidades) {
      setAvailableModalidades(modalidades);
    }
  };

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    HandleLoading();
  }, []);

  function normalizeMatches(data) {
    const out = [];
    if (!data) return out;

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const m = item.match ? item.match : item;
        out.push(normalizeSingleMatch(m));
      });
      return out;
    }

    if (data.matches_by_round) {
      Object.values(data.matches_by_round).forEach((arr) => {
        arr.forEach((item) => {
          const m = item.match ? item.match : item;
          out.push(normalizeSingleMatch(m));
        });
      });
      return out;
    }

    if (data.matches && Array.isArray(data.matches)) {
      data.matches.forEach((item) => {
        const m = item.match ? item.match : item;
        out.push(normalizeSingleMatch(m));
      });
      return out;
    }

    if (typeof data === "object") {
      out.push(normalizeSingleMatch(data));
    }

    return out;
  }

  function normalizeSingleMatch(m) {
    if (!m) return null;
    const player1_id = m.player1_id ?? m.player1?.id ?? m.player1?.participant_id ?? null;
    const player2_id = m.player2_id ?? m.player2?.id ?? m.player2?.participant_id ?? null;
    const player1_name = m.player1?.name ?? m.player1?.display_name ?? m.player1?.participant_name ?? null;
    const player2_name = m.player2?.name ?? m.player2?.display_name ?? m.player2?.participant_name ?? null;

    return {
      id: m.id ?? m.identifier ?? null,
      round: m.round ?? m.round_name ?? null,
      player1_id,
      player2_id,
      player1_name,
      player2_name,
      scores_csv: m.scores_csv ?? (Array.isArray(m.scores) ? m.scores.join(",") : m.scores ?? ""),
      winner_id: m.winner_id ?? m.winner?.id ?? null,
      raw: m,
    };
  }

  const loadTournamentData = async (tournament) => {
    if (!tournament?.id) return;

    const matches = await verPartidas(tournament.id);
    if (!matches) {
      toast.error(matches?.erro || "Erro ao buscar participantes", toastSettings);
      return;
    }

    const normalized = normalizeMatches(matches);
    setMatches(normalized.filter(Boolean));
    const si = {};
    normalized.forEach((mm) => {
      if (!mm) return;
      const csv = mm.scores_csv || "";
      let p1 = "",
        p2 = "";
      if (csv && csv.includes("-")) {
        const first = csv.split(",")[0].trim();
        const [a, b] = first.split("-").map((s) => s.trim());
        p1 = a;
        p2 = b;
      }
      si[mm.id] = { p1: p1 ?? "", p2: p2 ?? "", winner: mm.winner_id ?? "" };
    });
    setScoreInputs(si);

    const participants = await verParticipantes(tournament.id);
    if (!participants) {
      toast.error(participants?.erro || "Erro ao buscar participantes", toastSettings);
      return;
    }

    const flat = participants.map((p) => p.participant || p);
    setParticipants(flat);

    const map = {};
    flat.forEach((p) => {
      map[p.id] = p;
    });
    setParticipantMap(map);

    const initialSeeds = {};
    flat.forEach((p) => {
      initialSeeds[p.id] = p.seed ?? "";
    });
    setSeedSelections(initialSeeds);

    setChaveamento(tournament.live_image_url || "");
    setChaveamentoTs(Date.now());
  };

  useEffect(() => {
    if (selectedTournament) {
      loadTournamentData(selectedTournament);
    }
  }, [selectedTournament]);

  function buildChaveamentoUrl(url) {
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}t=${chaveamentoTs}`;
  }

  async function startTournament() {
    if (!selectedTournament?.id) return;
    const result = await comecarCampeonato(selectedTournament.id);
    if (result) {
      setSelectedTournament(result.tournament);
      await atualizarCampeonatos();
      setChaveamentoTs(Date.now());
    }
  }

  async function finalizeTournament() {
    if (!selectedTournament?.id) return;
    const result = await finalizarCampeonato(selectedTournament.id);
    if (result) {
      setSelectedTournament(result.tournament);
      await atualizarCampeonatos();
      setChaveamentoTs(Date.now());
    }
  }

  async function restartTournament() {
    if (!selectedTournament?.id) return;
    const result = await resetarCampeonato(selectedTournament.id);
    if (result) {
      setSelectedTournament(result.tournament);
      await atualizarCampeonatos();
      setChaveamentoTs(Date.now());
    }
  }

  function handleMatchScoreChange(matchId, which, value) {
    setScoreInputs((prev) => ({
      ...prev,
      [matchId]: { ...(prev[matchId] || {}), [which]: value },
    }));
  }

  async function updateMatchScore(match) {
    if (!selectedTournament?.id || !match?.id) return;
    if (!match.player1_id || !match.player2_id)
      return toast.info("Você que tem definir vencedores das partidas anteriores", toastSettings);
    const inputs = scoreInputs[match.id] || { p1: "", p2: "", winner: "" };
    const p1 = inputs.p1 === "" ? null : parseInt(inputs.p1, 10);
    const p2 = inputs.p2 === "" ? null : parseInt(inputs.p2, 10);
    const winner = inputs.winner === "" ? null : inputs.winner;

    if (p1 === null || p2 === null) {
      toast.warn("Preencha ambos os placares antes de enviar.", toastSettings);
      return;
    }

    const scoresCsv = `${p1}-${p2}`;
    const body = { match: { scores_csv: scoresCsv } };
    if (winner) body.match.winner_id = winner;

    const result = await editarPartidas(body, selectedTournament.id, match.id);
    if (result) {
      const updatedTournamentsList = await verCampeonatos();
      setTournaments(updatedTournamentsList);
      const updatedTournament = updatedTournamentsList.find((t) => t.tournament.id === selectedTournament.id);

      if (updatedTournament) {
        setSelectedTournament(updatedTournament.tournament);
      } else {
        await loadTournamentData(selectedTournament);
      }
    }
  }

  function handleSeedSelectionChange(participantId, newSeed) {
    setSeedSelections((prev) => ({ ...prev, [participantId]: newSeed === "" ? "" : parseInt(newSeed, 10) }));
  }

  async function updateParticipantSeed(participantId) {
    if (!selectedTournament?.id) return;
    const newSeed = seedSelections[participantId];
    if (newSeed === "" || newSeed == null || isNaN(newSeed)) {
      toast.warn("Escolha uma seed válida antes de enviar", toastSettings);
      return;
    }

    const max = Math.max(1, participants.length);
    if (newSeed < 1 || newSeed > max) {
      toast.warn(`Seed inválida. Escolha entre 1 e ${max}.`, toastSettings);
      return;
    }

    const target = participants.find((p) => p.id === participantId);
    if (!target) {
      toast.error("Participante não encontrado", toastSettings);
      return;
    }

    const oldSeed = target.seed ?? null;
    if (oldSeed === newSeed) {
      toast.info("A seed selecionada já é a atual. Nada a fazer.", toastSettings);
      return;
    }

    const occupant = participants.find((p) => Number(p.seed) === Number(newSeed) && p.id !== participantId);

    if (!occupant) {
      const result = await editarParticipantes(
        { participant: { seed: newSeed } },
        selectedTournament.id,
        participantId
      );
      if (result) {
        await loadTournamentData(selectedTournament);
        setChaveamentoTs(Date.now());
      }
    } else {
      const bodyOcc = { participant: { seed: oldSeed === null ? null : oldSeed } };
      const bodyTarget = { participant: { seed: newSeed } };

      const result = await editarParticipantes(bodyOcc, selectedTournament.id, occupant.id);
      const result2 = await editarParticipantes(bodyTarget, selectedTournament.id, participantId);
      if (result && result2) {
        toast.success("Alteração do chaveamento feita com sucesso!", toastSettings);
        await loadTournamentData(selectedTournament);
        setChaveamentoTs(Date.now());
      } else {
        await loadTournamentData(selectedTournament);
      }
    }
  }

  function renderSeedOptionsForParticipant(participant) {
    const n = Math.max(1, participants.length);
    const options = [];
    for (let i = 1; i <= n; i++) {
      const occupying = participants.find((p) => Number(p.seed) === i);
      const label = occupying ? `${i} — ${occupying.name || occupying.display_name}` : `${i}`;
      options.push(
        <option key={i} value={i}>
          {label}
        </option>
      );
    }
    return options;
  }

  return (
    <div
      className="min-h-screen bg-[url('/assets/AdmBG.png')]  bg-cover bg-center flex 
      flex-col gap-5 py-5 items-center justify-center"
    >
      {/* Container 1: Torneios */}
      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[500px] w-full flex flex-col items-center">
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-20" />
          <div className="border-l border-neutra-preta w-2.5 h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        {tournaments?.length > 0 ? (
          <div className="w-full">
            <label className="text-sm w-full" htmlFor="nome">
              Campeonatos
            </label>
            <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
              {tournaments.map((t) => (
                <div
                  key={t.tournament.id}
                  onClick={() => {
                    setSelectedTournament(t.tournament);
                    setChaveamento(t.tournament.live_image_url || "");
                    setChaveamentoTs(Date.now());
                    loadTournamentData(t.tournament);
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <ClickableUserEntry name={t.tournament.name || ""} />
                  </div>
                </div>
              ))}
            </div>

            <label className="text-sm text-center w-full mt-3" htmlFor="editNome">
              Nome do Campeonato
            </label>
            <input
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={selectedTournament?.name ?? ""}
              type="text"
              id="name"
              disabled
            />
            <label className="text-sm text-center w-full" htmlFor="tipo">
              Modalidade
            </label>
            <input
              type="text"
              className="bg-neutra-branca text-[#aaa] border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={
                parseInt(selectedTournament?.description)
                  ? availableModalidades[parseInt(selectedTournament.description)]?.nome || ""
                  : ""
              }
              id="tipo"
              disabled
            />

            <img
              src={buildChaveamentoUrl(chaveamento)}
              className="w-full h-60 object-[left 140px] object-cover object-center rounded mt-3"
              width="100%"
              height="300"
              alt="chaveamento"
            />
            <Link to="/adm">
              <button
                type="button"
                className="bg-destaque text-white px-6 py-2 rounded-lg border border-neutra-branca
                 cursor-pointer transition-colors duration-300 hover:bg-white hover:text-red-500 
                 hover:border-red-500"
              >
                Voltar
              </button>
            </Link>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-2">Sem torneios</p>
        )}
      </div>
      {/* Container 2 OR 3 depending on state */}
      {selectedTournament && selectedTournament.state == "pending" ? (
        // Container 2 (pre-start): mostra participantes + botão verde Iniciar Torneio
        <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
          <div className="w-full">
            <h3 className="text-lg font-[energy] mb-2">Participantes (pré-início)</h3>

            {participants.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum participante carregado. Selecione um torneio.</p>
            ) : (
              <div className="w-full overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {participants.map((p) => (
                    <div key={p.id} className="bg-white p-3 rounded shadow-sm flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{p.name || p.display_name || p.username || "—"}</p>
                        <p className="text-xs text-gray-500">ID do participante: {p.id}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-600 mr-2">
                          Seed atual: <span className="font-semibold">{p.seed ?? "—"}</span>
                        </div>

                        <select
                          value={seedSelections[p.id] ?? ""}
                          onChange={(e) => handleSeedSelectionChange(p.id, e.target.value)}
                          className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2"
                        >
                          <option value="">—</option>
                          {renderSeedOptionsForParticipant(p)}
                        </select>

                        <button
                          onClick={() => updateParticipantSeed(p.id)}
                          className="bg-neutra-preta text-white px-3 py-1 rounded-lg border 
                          border-neutra-branca cursor-pointer transition-colors duration-300 
                          hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
                        >
                          Editar Seed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão Iniciar Torneio */}
            <div className="flex justify-center gap-5 mt-6">
              <button
                onClick={startTournament}
                className="bg-green-600 text-white px-6 py-2 rounded-lg border-neutra-branca 
                hover:bg-white hover:text-green-600 border hover:border-green-600 transition 
                cursor-pointer"
              >
                Iniciar Torneio
              </button>
            </div>
          </div>
        </div>
      ) : selectedTournament && selectedTournament.state != "pending" && selectedTournament.state != "complete" ? (
        // Container 3 (tournament open)
        <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
          <div className="w-full">
            <h3 className="text-lg font-[energy] mb-2">Partidas (Torneio Aberto)</h3>

            {matches.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma partida carregada.</p>
            ) : (
              <>
                <div className="w-full overflow-y-auto max-h-[52vh] grid gap-3">
                  {matches.map((m) => (
                    <div
                      key={m.id || `${m.player1_id}-${m.player2_id}-${m.round}`}
                      className="bg-white p-3 rounded shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{m.round ? `Rodada ${m.round}` : `Match ${m.id}`}</p>
                          <p className="text-xs text-gray-600">
                            {participantMap[m.player1_id]?.name || m.player1_name || "—"} vs{" "}
                            {participantMap[m.player2_id]?.name || m.player2_name || "—"}
                          </p>
                        </div>

                        <div className="text-sm text-gray-700">{m.scores_csv || "—"}</div>
                      </div>

                      {/* inputs para editar placar + winner */}
                      <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">
                              {participantMap[m.player1_id]?.name || m.player1_name || "—"}
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={(scoreInputs[m.id] && scoreInputs[m.id].p1) ?? ""}
                              onChange={(e) => handleMatchScoreChange(m.id, "p1", e.target.value)}
                              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2 w-24"
                            />
                          </div>

                          <div className="text-lg font-bold">—</div>

                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">
                              {participantMap[m.player2_id]?.name || m.player2_name || "—"}
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={(scoreInputs[m.id] && scoreInputs[m.id].p2) ?? ""}
                              onChange={(e) => handleMatchScoreChange(m.id, "p2", e.target.value)}
                              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2 w-24"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs">ID do ganhador</label>
                          <select
                            value={(scoreInputs[m.id] && scoreInputs[m.id].winner) ?? ""}
                            onChange={(e) => handleMatchScoreChange(m.id, "winner", e.target.value)}
                            className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2"
                          >
                            <option value="">—</option>
                            <option value={m.player1_id}>
                              {m.player1_id} — {participantMap[m.player1_id]?.name || m.player1_name || "—"}
                            </option>
                            <option value={m.player2_id}>
                              {m.player2_id} — {participantMap[m.player2_id]?.name || m.player2_name || "—"}
                            </option>
                          </select>

                          <button
                            onClick={() => updateMatchScore(m)}
                            className="bg-neutra-preta text-white px-4 py-2 rounded-lg border 
                          border-neutra-branca cursor-pointer transition-colors duration-300 
                          hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
                          >
                            Atualizar Placar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-5 mt-6">
                  <button
                    onClick={restartTournament}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg border-neutra-branca 
                hover:bg-white hover:text-red-600 border hover:border-red-600 transition 
                cursor-pointer"
                  >
                    Resetar Torneio
                  </button>
                  {selectedTournament.state == "awaiting_review" && (
                    <button
                      onClick={finalizeTournament}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg border-neutra-branca 
                hover:bg-white hover:text-green-600 border hover:border-green-600 transition 
                cursor-pointer"
                    >
                      Finalizar Torneio
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-neutra-branca rounded font-bold shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
          Torneio Finalizado
          <button
            onClick={restartTournament}
            className="bg-red-600 text-white font-normal px-6 py-2 rounded-lg border-neutra-branca 
                hover:bg-white hover:text-red-600 border hover:border-red-600 transition 
                cursor-pointer"
          >
            Resetar Torneio
          </button>
        </div>
      )}
    </div>
  );
}
