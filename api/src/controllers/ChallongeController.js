const { challongeFetch } = require("../services/challongeFetch");

module.exports = {
  createTournament: async (req, res) => {
    const data = await challongeFetch("tournaments.json", "POST", req.body);
    res.status(201).json(data);
  },

  editTournament: async (req, res) => {
    const data = await challongeFetch(`tournaments/${tournamentId}/`, "PATCH", req.body);
    res.status(201).json(data);
  },

  deleteTournament: async (req, res) => {
    const data = await challongeFetch(`tournaments/${tournamentId}/`, "DELETE");
    res.status(201).json(data);
  },

  addParticipants: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants/bulk_add.json`, "POST", req.body);
    res.status(201).json(data);
  },

  removeParticipants: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants/clear.json`, "DELETE");
    res.status(201).json(data);
  },

  startTournament: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/start.json`, "POST");
    res.status(200).json(data);
  },

  getMatches: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches.json`, "GET");
    res.status(200).json(data);
  },

  updateMatch: async (req, res) => {
    const { tournamentId, matchId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches/${matchId}.json`, "PUT", req.body);
    res.status(200).json(data);
  },

  getParticipants: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants.json`, "GET");
    res.status(200).json(data);
  },
};
