import Score from "../../components/score.jsx";

export default function ScorePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-neutra-branca p-4 sm:p-6 md:p-8 rounded-xl shadow-md mb-6 w-full max-w-md text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-secundaria">
          Campeonato X
        </h2>
      </div>

      <div className="bg-neutra-branca p-4 sm:p-6 md:p-8 rounded-xl shadow-md w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6">
        <Score team={"Time 1"} />

        <h2 className="text-xl sm:text-2xl font-bold text-gray-600">VS</h2>

        <Score team={"Time 2"} />
      </div>
    </div>
  );
}
