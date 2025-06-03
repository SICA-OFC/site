const express = require("express");
const router = express.Router();
const UserController = require(`../controllers/UserController`);
const { registerClient } = require('../services/sseService');
const authToken = require("../middlewares/authToken");
const catchAsync = require('../middlewares/catchAsync');
const captcha = require("../services/captcha");

// Rotas públicas
router.get("/captcha", catchAsync(captcha));
router.post("/cadastro", catchAsync(UserController.CriarUsuario));
router.post("/cadastro", catchAsync(UserController.CriarUsuario));
router.post("/token", catchAsync(UserController.GerarToken));
router.post('/verificarSessao', UserController.VerificarSessao);

router.post("/enviarCodigo", catchAsync(UserController.EnviarCodigo));
router.post("/logout", catchAsync(UserController.Logout)); // Nova rota

router.get("/approve/:userId/:action", catchAsync(UserController.LiberarUsuario));
router.get("/events/:userId", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    registerClient(req.params.userId, res);
});

router.get("/ver", catchAsync(UserController.VerUsuario));

// Rotas protegidas (requerem autenticação)
router.use(authToken);
router.post("/verificar", catchAsync(UserController.Verificar));
router.post("/login", catchAsync(UserController.LogarUsuario));
router.delete("/deletar", catchAsync(UserController.DeletarUsuario));
router.patch("/editar", catchAsync(UserController.EditarUsuario));

module.exports = router;