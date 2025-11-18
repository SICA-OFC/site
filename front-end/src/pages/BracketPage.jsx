import { useEffect, useState } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { verCampeonatos, verModalidades, verParticipantes, verPartidas } from '../hooks/api.js';

function TournamentCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

function ImageSkeleton() {
  return <div className="w-full h-[300px] max-h-[300px] bg-gray-300 rounded shadow-md animate-pulse" />;
}

export default function BracketPage() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [chaveamento, setChaveamento] = useState('');
  const [chaveamentoTs, setChaveamentoTs] = useState(Date.now());
  const [availableModalidades, setAvailableModalidades] = useState([]);
  const [matches, setMatches] = useState([]);
  const [participantMap, setParticipantMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleLoading = async () => {
    setIsLoading(true);
    try {
      const result = await verCampeonatos();
      const { modalidades } = await verModalidades();

      if (result) {
        const filtered = (result || []).filter((t) => t.tournament.state !== 'pending');
        setTournaments(filtered);
      }
      if (modalidades) setAvailableModalidades(modalidades);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const handlePartidas = async (id) => {
    const matchesData = await verPartidas(id);
    if (!matchesData || !Array.isArray(matchesData)) {
      console.error('Erro ao buscar partidas');
      setMatches([]);
      return;
    }
    const matchesList = matchesData.map((item) => item.match);

    const participants = await verParticipantes(id);
    if (!participants) {
      toast.error(participants?.erro || 'Erro ao buscar participantes', toastSettings);
      return;
    }

    const flat = participants.map((p) => p.participant || p);
    const map = {};
    flat.forEach((p) => {
      map[p.id] = p;
    });

    setParticipantMap(map);
    setMatches(matchesList);
  };

  useEffect(() => {
    if (!selectedTournament) return;
    handlePartidas(selectedTournament.id);
  }, [selectedTournament]);

  function traduzirEstado(estado) {
    switch (estado) {
      case 'underway':
        return 'Em andamento';
      case 'awaiting_review':
        return 'Esperando análise';
      case 'complete':
        return 'Finalizado';
      default:
        return estado;
    }
  }

  function buildChaveamentoUrl(url) {
    if (!url) return '';
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}t=${chaveamentoTs}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center gap-6 py-10 bg-neutra-branca flex-1">
        <h1 className="text-2xl font-bold mb-6">Torneios Públicos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-[1200px] px-4">
          {isLoading ? (
            <>
              <TournamentCardSkeleton />
              <TournamentCardSkeleton />
              <TournamentCardSkeleton />
            </>
          ) : tournaments.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">Nenhum torneio disponível</p>
          ) : (
            tournaments.map((t) => {
              const modalidadeId = parseInt(t.tournament.description);
              const modalidadeNome = modalidadeId && !isNaN(modalidadeId) ? availableModalidades.find((m) => m.id === modalidadeId)?.nome || '' : '';
              const estadoTraduzido = traduzirEstado(t.tournament.state);

              return (
                <div
                  key={t.tournament.id}
                  className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition
                    ${t.tournament.state === 'underway' ? 'border-green-500 border-2' : ''}
                    ${t.tournament.state === 'awaiting_review' ? 'border-yellow-500 border-2' : ''}
                    ${t.tournament.state === 'complete' ? 'text-gray-800 border-2' : ''}
                    `}
                  onClick={() => {
                    setSelectedTournament(t.tournament);
                    setIsImageLoading(true);
                    setChaveamento(t.tournament.live_image_url || '');
                    setChaveamentoTs(Date.now());
                  }}
                >
                  <p className="text-sm text-gray-500">ID: {t.tournament.id}</p>
                  <h2 className="font-bold text-lg mt-1">{t.tournament.name}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm mt-1">{modalidadeNome}</p>
                    <p
                      className={`
                    text-xs font-semibold px-2.5 py-0.5 rounded-full
                    ${t.tournament.state === 'underway' ? 'bg-green-100 text-green-800' : ''}
                    ${t.tournament.state === 'awaiting_review' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${t.tournament.state === 'complete' ? 'bg-gray-200 text-gray-800' : ''}
                  `}
                    >
                      {estadoTraduzido}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chaveamento grande */}
        {selectedTournament && (
          <div className="w-full max-w-[400px] bg-white rounded-lg flex flex-col items-center shadow-md px-5 py-3">
            {isImageLoading && <ImageSkeleton />}
            <img src={buildChaveamentoUrl(chaveamento)} alt="Chaveamento" className={`w-full max-h-[600px] object-[left 140px] object-cover object-center rounded ${isImageLoading ? 'hidden' : 'flex'}`} onLoad={() => setIsImageLoading(false)} onError={() => setIsImageLoading(false)} />

            {matches && (
              <div className='w-full'>
                {matches.map((m) => {
                  let winnerName = '—';
                  if (m.winner_id) {
                    winnerName = m.winner_id === m.player1_id ? participantMap[m.player1_id]?.name || m.player1_name || 'Jogador 1' : participantMap[m.player2_id]?.name || m.player2_name || 'Jogador 2';
                  }

                  const csv = m.scores_csv || '';
                  let p1 = '—';
                  let p2 = '—';

                  if (csv && csv.includes('-')) {
                    const first = csv.split(',')[0].trim();
                    const [a, b] = first.split('-').map((s) => s.trim());
                    p1 = a;
                    p2 = b;
                  }
                  return (
                    <div key={m.id || `${m.player1_id}-${m.player2_id}-${m.round}`} className="p-3 rounded shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{m.round ? `Rodada ${m.round}` : `Match ${m.id}`}</p>
                          <p className="text-xs text-gray-600">
                            {participantMap[m.player1_id]?.name || m.player1_name || '—'} vs {participantMap[m.player2_id]?.name || m.player2_name || '—'}
                          </p>
                        </div>

                        <div className="text-sm text-gray-700">{m.scores_csv || '—'}</div>
                      </div>

                      <div className="mt-3 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Data do Jogo</span>
                          <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-3 w-50" value={m.date || ''} type="date" name="data_jogo" disabled />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">{participantMap[m.player1_id]?.name || m.player1_name || '—'}</span>
                            <input type="text" inputMode="numeric" name="p1" value={p1 ?? ''} className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2 w-20" disabled />
                          </div>
                          <div className="text-sm font-bold">—</div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">{participantMap[m.player2_id]?.name || m.player2_name || '—'}</span>
                            <input type="text" inputMode="numeric" name="p2" value={p2 ?? ''} className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2 w-20" disabled />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs">Ganhador</span>
                            <input type="text" value={winnerName ?? ''} className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-2 w-24" disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setSelectedTournament(null)}
              className="mt-3 bg-red-500 text-white px-6 py-2 rounded-lg border border-neutra-branca
                 cursor-pointer transition-colors duration-300 hover:bg-white hover:text-red-500 
                 hover:border-red-500"
            >
              Fechar
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
