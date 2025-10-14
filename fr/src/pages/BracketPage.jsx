import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { Bounce, toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings.js";

// ...imports e setup continuam iguais

export default function BracketPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [chaveamento, setChaveamento] = useState("");
  const [chaveamentoTs, setChaveamentoTs] = useState(Date.now());

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

  const fetchTournaments = async () => {
    try {
      const { ok, json } = await callChaveamento("tournaments.json", "GET");
      if (ok) {
        // filtra tudo menos pending
        const filtered = (json || []).filter((t) => t.tournament.state !== "pending");
        setTournaments(filtered);
      } else {
        toast.error(json?.erro || "Erro ao buscar torneios", toastSettings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao buscar torneios", toastSettings);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  function buildChaveamentoUrl(url) {
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}t=${chaveamentoTs}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col items-center gap-6 py-10 bg-neutra-branca flex-1">
        <h1 className="text-2xl font-bold mb-6">Torneios Públicos</h1>

        {/* Lista de torneios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-[1200px] px-4">
          {tournaments.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">Nenhum torneio disponível</p>
          )}
          {tournaments.map((t) => (
            <div
              key={t.tournament.id}
              className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition ${t.tournament.state === "underway"
                  ? "border-green-500 border-2"
                  : t.tournament.state === "complete"
                    ? "border-gray-400 border-2"
                    : ""
                }`}
              onClick={() => {
                setSelectedTournament(t.tournament);
                setChaveamento(t.tournament.live_image_url || "");
                setChaveamentoTs(Date.now());
              }}
            >
              <p className="text-sm text-gray-500">ID: {t.tournament.id}</p>
              <h2 className="font-bold text-lg mt-1">{t.tournament.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {t.tournament.description
                  ? t.tournament.description.charAt(0).toUpperCase() + t.tournament.description.slice(1)
                  : "Sem descrição"}
              </p>
            </div>
          ))}
        </div>

        {/* Chaveamento grande */}
        {selectedTournament && (
          <div className="w-full max-w-[400px] flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">{selectedTournament.name} - Chaveamento</h2>
            <img
              src={buildChaveamentoUrl(chaveamento)}
              alt="Chaveamento"
              className="w-full max-h-[600px] object-[left 140px] object-cover object-center  rounded shadow-md"
            />

            <button
              onClick={() => setSelectedTournament(null)}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
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
