import { useEffect, useState } from 'react';
import Header from '/src/components/header.jsx';
import Footer from '/src/components/footer.jsx';
import { verModalidades, verTimes } from '/src/hooks/api.js';

function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

function ClickableUserEntry({ name, course }) {
  return (
    <p className="text-sm font-medium">
      <span className="text-[#f26522] hover:underline cursor-pointer">
        {name} | {course}
      </span>
    </p>
  );
}

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [availableModalidades, setAvailableModalidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = async () => {
    setIsLoading(true);
    try {
      const result = await verTimes();
      const { modalidades } = await verModalidades();

      if (result && Array.isArray(result.times)) {
        setTeams(result.times);
      } else if (result && result.erro) {
        console.error('Erro ao carregar times:', result.erro);
        setTeams([]);
      } else if (Array.isArray(result)) {
        console.log('Times carregados (array direto):', result);
        setTeams(result);
      } else {
        if (result) {
          console.warn('Resposta inesperada de verTimes:', result);
        }
        setTeams([]);
      }

      if (modalidades) {
        setAvailableModalidades(modalidades);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setTeams([]);
      setAvailableModalidades([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const selectedModalidadeId = parseInt(selectedTeam?.modalidade_id);
  const selectedModalidade = availableModalidades.find((m) => m.id === selectedModalidadeId);
  const selectedModalidadeNome = selectedModalidade ? selectedModalidade.nome : 'Sem modalidade';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center gap-6 py-10 bg-neutra-branca flex-1 pt-24">
        <h1 className="text-2xl font-bold mb-6">Times</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-[1200px] px-4">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : teams.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">Nenhum time disponível</p>
          ) : (
            teams.map((t) => {
              const modalidadeId = parseInt(t.modalidade_id);
              const modalidade = availableModalidades.find((m) => m.id === modalidadeId);
              const modalidadeNome = modalidade ? modalidade.nome : 'Sem modalidade';

              return (
                <div
                  key={t.id}
                  className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition`}
                  onClick={() => {
                    console.log('Time selecionado:', t);
                    setSelectedTeam(t);
                  }}
                >
                  <p className="text-sm text-gray-500">ID: {t.id}</p>
                  <h2 className="font-bold text-lg mt-1">{t.nome}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600 text-sm mt-1">{modalidadeNome}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {selectedTeam && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setSelectedTeam(null)}>
            <div className="w-full max-w-lg bg-white rounded-lg flex flex-col shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="border-b pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedTeam.nome}</h2>
                <p className="text-md text-gray-600">{selectedModalidadeNome}</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-2">Membros</h3>
              <div className="flex flex-col gap-3 overflow-y-auto max-h-64 pr-2">
                {selectedTeam.membros_time && selectedTeam.membros_time.length > 0 ? (
                  selectedTeam.membros_time.map((membro) => {
                    if (!membro.usuarios) {
                      console.warn('Membro encontrado sem dados de usuário:', membro);
                      return null;
                    }

                    const user = membro.usuarios;
                    const course = user.cursos ? user.cursos.sigla : 'N/A';

                    return (
                      <div key={user.rm || membro.membro_id} className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200">
                        <ClickableUserEntry name={user.nome} course={course} />
                        <span className="text-xs text-gray-500 capitalize ml-1">Função: {membro.funcao || 'jogador'}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">Este time não possui membros.</p>
                )}
              </div>

              <button
                onClick={() => setSelectedTeam(null)}
                className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg border border-red-500
                           cursor-pointer transition-colors duration-300 hover:bg-white hover:text-red-500"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
