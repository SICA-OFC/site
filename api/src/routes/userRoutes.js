const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const authToken = require("../middlewares/authToken.js");
const catchAsync = require('../middlewares/catchAsync.js');
const { registerClient } = require('../services/sseService'); 
const captcha = require("../services/captcha.js");

// Rotas públicas
router.post("/cadastro", catchAsync(userController.CriarUsuario));
router.post("/login", catchAsync(userController.LogarUsuario));
router.get("/captcha", catchAsync(captcha));

router.get("/approve/:user_id/:action", catchAsync(userController.LiberarUsuario));
router.get("/events/:user_id", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    registerClient(req.params.user_id, res);
});

router.get("/ver", catchAsync(userController.VerID));
router.post("/verificarSessao", catchAsync(userController.VerificarSessao));

// Rotas protegidas (requerem autenticação)
router.use(authToken);
router.get("/", catchAsync(userController.VerUsuario));
router.post("/verificar", catchAsync(userController.Verificar));
router.post("/enviarCodigo", catchAsync(userController.EnviarCodigo));
router.patch("/editar", catchAsync(userController.EditarUsuario));
router.patch("/redefinirSenha", catchAsync(userController.RedefinirSenha));
router.delete("/deletar", catchAsync(userController.DeletarUsuario));
router.post("/logout", catchAsync(userController.Logout));

module.exports = router;