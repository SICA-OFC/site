const express = require("express");
const router = express.Router();
const teamController = require("../controllers/TeamController.js");
const authToken = require("../middlewares/authToken.js");
const catchAsync = require("../middlewares/catchAsync.js");

// Rotas protegidas (requerem autenticação)
router.get("/modalidades", catchAsync(teamController.VerModalidades));
router.get("/", catchAsync(teamController.VerTimes));
router.get("/:id", catchAsync(teamController.VerTime));
router.use(authToken);
router.post("/", catchAsync(teamController.CriarTime));
router.patch("/:id", catchAsync(teamController.EditarTime));
router.delete("/:id", catchAsync(teamController.DeletarTime));

module.exports = router;