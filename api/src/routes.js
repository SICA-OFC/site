const express = require("express");
const router = express.Router();
const UserController = require(`./controllers/UserController`);
const { registerClient } = require('./services/sseService');
const authToken = require("./middlewares/authToken");
const catchAsync = require('./middlewares/catchAsync');
const captcha = require("./services/captcha");

// Rotas públicas
router.get("/captcha", catchAsync(captcha));
router.post("/usuario/cadastro", catchAsync(UserController.CriarUsuario));
router.post("/usuario/cadastro", catchAsync(UserController.CriarUsuario));
router.post("/usuario/token", catchAsync(UserController.GerarToken));
router.post('/usuario/verificarSessao', UserController.VerificarSessao);

router.post("/usuario/enviarCodigo", catchAsync(UserController.EnviarCodigo));
router.post("/usuario/logout", catchAsync(UserController.Logout)); // Nova rota

router.get("/account/approve/:userId/:action", catchAsync(UserController.LiberarUsuario));
router.get("/events/:userId", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    registerClient(req.params.userId, res);
});

router.get("/usuario/ver", catchAsync(UserController.VerUsuario));

// Rotas protegidas (requerem autenticação)
router.use(authToken);
router.post("/usuario/verificar", catchAsync(UserController.Verificar));
router.post("/usuario/login", catchAsync(UserController.LogarUsuario));
router.delete("/usuario/deletar", catchAsync(UserController.DeletarUsuario));
router.patch("/usuario/editar", catchAsync(UserController.EditarUsuario));

module.exports = router;