const express = require("express");
const router = express.Router();
const challongeController = require("../controllers/ChallongeController.js");
const authToken = require("../middlewares/authToken.js");
const catchAsync = require("../middlewares/catchAsync.js");


router.use(authToken);
router.post("/", catchAsync(challongeController.createTournament));
router.get("/", catchAsync(challongeController.getTournaments));
router.patch("/:tournamentId", catchAsync(challongeController.editTournament));
router.delete("/:tournamentId", catchAsync(challongeController.deleteTournament));
router.post("/:tournamentId/start", catchAsync(challongeController.startTournament));
router.post("/:tournamentId/finalize", catchAsync(challongeController.finalizeTournament));
router.post("/:tournamentId/reset", catchAsync(challongeController.resetTournament));

router.post("/:tournamentId/participants/bulk_add", catchAsync(challongeController.addParticipants));
router.get("/:tournamentId/participants", catchAsync(challongeController.getParticipants));
router.patch("/:tournamentId/participants/:participantsId", catchAsync(challongeController.updateParticipants));
router.delete("/:tournamentId/participants/clear", catchAsync(challongeController.removeParticipants));

router.get("/:tournamentId/matches", catchAsync(challongeController.getMatches));
router.patch("/:tournamentId/matches/:matchId", catchAsync(challongeController.updateMatch));
router.patch("/:tournamentId/matches/:matchId/attachments", catchAsync(challongeController.addDate))

module.exports = router;
