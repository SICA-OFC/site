import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";

function ClickableUserEntry({ name }) {
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{name}</span>
    </p>
  );
}

export default function BracketEditorPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const fetchedRef = useRef(false);

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [matches, setMatches] = useState([]); // normalized match objects
  const [participants, setParticipants] = useState([]);
  const [participantMap, setParticipantMap] = useState({});

  const [seedSelections, setSeedSelections] = useState({});
  const [scoreInputs, setScoreInputs] = useState({}); // { [matchId]: { p1: "", p2: "", winner: "" } }

  const [chaveamento, setChaveamento] = useState("");
  const [chaveamentoTs, setChaveamentoTs] = useState(Date.now());

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

  // wrapper para seu endpoint /chaveamento
  async function callChaveamento(route, method = "GET", body = null) {
    const payload = { route, method };
    if (body !== null) payload.body = body;
    const res = await fetch(`${BASE_URL}/chaveamento`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const json = await res.json();
    return { ok: res.ok, json };
  }

  // flatten / normalize matches response de várias formas (array, matches_by_round, etc.)
  function normalizeMatches(data) {
    const out = [];
    if (!data) return out;

    // if array of items (each item possibly { match: {...} } or direct)
    if (Array.isArray(data)) {
      data.forEach((item) => {
        const m = item.match ? item.match : item;
        out.push(normalizeSingleMatch(m));
      });
      return out;
    }

    // if object with matches_by_round
    if (data.matches_by_round) {
      Object.values(data.matches_by_round).forEach((arr) => {
        arr.forEach((item) => {
          // item in this structure already contains player1, player2 nested
          const m = item.match ? item.match : item;
          out.push(normalizeSingleMatch(m));
        });
      });
      return out;
    }

    // if object with matches property
    if (data.matches && Array.isArray(data.matches)) {
      data.matches.forEach((item) => {
        const m = item.match ? item.match : item;
        out.push(normalizeSingleMatch(m));
      });
      return out;
    }

    // fallback: treat as single match object
    if (typeof data === "object") {
      out.push(normalizeSingleMatch(data));
    }

    return out;
  }

  // produce a consistent match object with player1_id, player2_id, scores_csv, id, round, raw
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

  // list tournaments
  const verCampeonatos = async () => {
    try {
      const { ok, json } = await callChaveamento("tournaments.json", "GET");
      if (ok) {
        setTournaments(json);
        if (!selectedTournament && Array.isArray(json) && json.length > 0) {
          setSelectedTournament(json[0].tournament);
          setChaveamento(json[0].tournament.live_image_url || "");
          setChaveamentoTs(Date.now());
        }
      } else {
        toast.error(json.erro || "Erro ao listar torneios", toastSettings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao buscar torneios", toastSettings);
    }
  };

  // load matches + participants and normalize
  const loadTournamentData = async (tournament) => {
    if (!tournament?.id) return;
    try {
      const matchesPromise = callChaveamento(`tournaments/${tournament.id}/matches.json`, "GET");
      const participantsPromise = callChaveamento(`tournaments/${tournament.id}/participants.json`, "GET");

      const [mRes, pRes] = await Promise.all([matchesPromise, participantsPromise]);

      // matches: might be array or object; normalize
      if (mRes.ok) {
        const normalized = normalizeMatches(mRes.json);
        setMatches(normalized.filter(Boolean));
        // initialize scoreInputs for matches if possible (parse scores_csv)
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
      } else {
        console.warn("Erro ao buscar matches:", mRes.json);
      }

      if (!pRes.ok) {
        toast.error(pRes.json?.erro || "Erro ao buscar participantes", toastSettings);
        return;
      }

      const partsRaw = pRes.json || [];
      const flat = partsRaw.map((p) => p.participant || p);
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

      // update imagem e timestamp
      setChaveamento(tournament.live_image_url || "");
      setChaveamentoTs(Date.now());
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar dados do torneio", toastSettings);
    }
  };

  useEffect(() => {
    if (selectedTournament) {
      loadTournamentData(selectedTournament);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTournament]);

  useEffect(() => {
    if (fetchedRef.current) return;
    verCampeonatos();
    fetchedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL]);

  // cache-busting builder
  function buildChaveamentoUrl(url) {
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}t=${chaveamentoTs}`;
  }

  // START tournament
  async function startTournament() {
    if (!selectedTournament?.id) return;
    try {
      const route = `tournaments/${selectedTournament.id}/start.json`;
      const { ok, json } = await callChaveamento(route, "POST");
      if (ok) {
        toast.success("Torneio iniciado com sucesso", toastSettings);
        await verCampeonatos();
        setTimeout(() => loadTournamentData(selectedTournament), 400);
        setChaveamentoTs(Date.now());
      } else {
        console.error(json);
        toast.error(json?.erro || "Erro ao iniciar torneio", toastSettings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao iniciar torneio", toastSettings);
    }
  }

  // handlers para inputs de placar e winner por partida
  function handleMatchScoreChange(matchId, which, value) {
    setScoreInputs((prev) => ({
      ...prev,
      [matchId]: { ...(prev[matchId] || {}), [which]: value },
    }));
  }

  // update single match: PATCH tournaments/{id}/matches/{match.id}.json
  async function updateMatchScore(match) {
    if (!selectedTournament?.id || !match?.id) return;
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

    try {
      const route = `tournaments/${selectedTournament.id}/matches/${match.id}.json`;
      const { ok, json } = await callChaveamento(route, "PATCH", body);
      if (ok) {
        toast.success("Placar atualizado", toastSettings);
        await loadTournamentData(selectedTournament);
      } else {
        console.error(json);
        toast.error(json?.erro || "Erro ao atualizar placar", toastSettings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar alteração de placar", toastSettings);
    }
  }

  // seed helpers retained from before (not modified)
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

    try {
      if (!occupant) {
        const route = `tournaments/${selectedTournament.id}/participants/${participantId}.json`;
        const body = { participant: { seed: newSeed } };
        const { ok, json } = await callChaveamento(route, "PATCH", body);
        if (ok) {
          toast.success("Seed atualizada com sucesso", toastSettings);
          await loadTournamentData(selectedTournament);
          setChaveamentoTs(Date.now());
        } else {
          console.error(json);
          toast.error(json?.erro || "Erro ao atualizar seed", toastSettings);
        }
      } else {
        const routeOcc = `tournaments/${selectedTournament.id}/participants/${occupant.id}.json`;
        const routeTarget = `tournaments/${selectedTournament.id}/participants/${participantId}.json`;

        const bodyOcc = { participant: { seed: oldSeed === null ? null : oldSeed } };
        const bodyTarget = { participant: { seed: newSeed } };

        const [resOcc, resTarget] = await Promise.all([
          callChaveamento(routeOcc, "PATCH", bodyOcc),
          callChaveamento(routeTarget, "PATCH", bodyTarget),
        ]);

        if (resOcc.ok && resTarget.ok) {
          toast.success(
            `Swap realizado: ${occupant.name || occupant.display_name} ↔ ${target.name || target.display_name}`,
            toastSettings
          );
          await loadTournamentData(selectedTournament);
          setChaveamentoTs(Date.now());
        } else {
          console.error("swap errors:", resOcc.json, resTarget.json);
          toast.error("Erro ao trocar seeds (swap). Tente novamente.", toastSettings);
          await loadTournamentData(selectedTournament);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro na requisição de atualização de seed", toastSettings);
    }
  }

  // render seed options (1..N) — used in participants list
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
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-neutra-preta w-[10px] h-[60px] mx-4"></div>
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
                typeof selectedTournament?.description === "string"
                  ? selectedTournament.description.charAt(0).toUpperCase() + selectedTournament.description.slice(1)
                  : ""
              }
              id="tipo"
              disabled
            />

            <img
              src={buildChaveamentoUrl(chaveamento)}
              className="w-full max-h-[200px] object-[left 140px] object-cover object-center rounded mt-3"
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
      {selectedTournament && selectedTournament.state !== "underway" ? (
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
      ) : selectedTournament && selectedTournament.state === "underway" ? (
        // Container 3 (tournament open): mostra TODAS as partidas e botão para atualizar cada placar + campo winner_id
        <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[2%] max-w-[900px] w-full flex flex-col items-center">
          <div className="w-full">
            <h3 className="text-lg font-[energy] mb-2">Partidas (Torneio Aberto)</h3>

            {matches.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma partida carregada.</p>
            ) : (
              <div className="w-full overflow-y-auto max-h-[60vh] grid gap-3">
                {matches.map((m) => (
                  <div
                    key={m.id || `${m.player1_id}-${m.player2_id}-${m.round}`}
                    className="bg-white p-3 rounded shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{m.round ? `Round ${m.round}` : `Match ${m.id}`}</p>
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
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
