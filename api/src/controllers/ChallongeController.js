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
    const data = await challongeFetch(`tournaments.json`, "GET");
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

  addParticipants: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants/bulk_add.json`, "POST", req.body);
    res.status(201).json(data);
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

  removeParticipants: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/participants/clear.json`, "DELETE");
    res.status(201).json(data);
  },

  getMatches: async (req, res) => {
    const { tournamentId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches.json`, "GET");

    const processingPromises = data.map(async (item) => {
      const match = item.match;
      const matchId = match.id;

      if (!match.attachment_count || match.attachment_count == 0) return item;
      const attachmentsArray = await challongeFetch(
        `tournaments/${tournamentId}/matches/${matchId}/attachments.json`,
        "GET"
      );

      if (!attachmentsArray || attachmentsArray.length == 0) return item;

      const firstAttachment = attachmentsArray[0].match_attachment;
      if (!firstAttachment || !firstAttachment.description) return item;
      match.date = firstAttachment.description;

      return item;
    });

    const processedData = await Promise.all(processingPromises);

    res.status(200).json(processedData);
  },

  updateMatch: async (req, res) => {
    const { tournamentId, matchId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches/${matchId}.json`, "PUT", req.body);
    res.status(200).json(data);
  },

  addDate: async (req, res) => {
    const { tournamentId, matchId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches/${matchId}/attachments.json`, "POST", req.body);
    res.status(200).json(data);
  },

  editDate: async (req, res) => {
    const { tournamentId, matchId } = req.params;
    const data = await challongeFetch(`tournaments/${tournamentId}/matches/${matchId}/attachments.json`, "PUT", req.body);
    res.status(200).json(data);
  },
};
