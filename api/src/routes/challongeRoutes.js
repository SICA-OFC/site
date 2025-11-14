const express = require("express");
const challongeController = require("../controllers/ChallongeController.js");
const authToken = require("../middlewares/authToken.js");

const router = express.Router();

router.post("/", catchAsync(challongeController.createTournament));
router.patch("/:tournamentId/", catchAsync(challongeController.editTournament));
router.delete("/:tournamentId/", catchAsync(challongeController.deleteTournament));
router.post("/:tournamentId/start", catchAsync(challongeController.startTournament));

router.post("/:tournamentId/participants/bulk_add", catchAsync(challongeController.addParticipants));
router.delete("/:tournamentId/participants/clear", catchAsync(challongeController.removeParticipants));

router.get("/:tournamentId/participants", catchAsync(challongeController.getParticipants));
router.get("/:tournamentId/matches", catchAsync(challongeController.getMatches));
router.patch("/:tournamentId/matches/:matchId", catchAsync(challongeController.updateMatch));

module.exports = router;
