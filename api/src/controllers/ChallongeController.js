const { challongeFetch } = require("../services/challongeFetch");

module.exports = {
  createTournament: async (req, res) => {
    const data = await challongeFetch("tournaments.json", "POST", req.body);
    res.status(201).json(data);
  },

  editTournament: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}.json`, "PATCH", req.body);
    res.status(201).json(data);
  },

  deleteTournament: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}.json`, "DELETE");
    res.status(201).json(data);
  },

  getTournaments: async (req, res) => {
    const data = await challongeFetch(`tournaments.json?include_participants=1&include_matches=1`, "GET");
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

  finalizeTournament: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/finalize.json`, "POST");
    res.status(200).json(data);
  },

  resetTournament: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/reset.json`, "POST");
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

  updateParticipants: async (req, res) => {
    const { tournamentId, participantsId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants/${participantsId}.json`, "PATCH", req.body);
    res.status(200).json(data);
  },
};
