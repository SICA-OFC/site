const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const authToken = require("../middlewares/authToken.js");
const catchAsync = require("../middlewares/catchAsync.js");
const { registerClient } = require("../services/sseService");
const multer = require("multer");
const { signInValidation, LoginValidation } = require("../services/validation.js");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas públicas
router.post("/", signInValidation, catchAsync(userController.CriarUsuario));
router.post("/login", LoginValidation, catchAsync(userController.LogarUsuario));

router.get("/approve/:user_id/:action", catchAsync(userController.LiberarUsuario));
router.get("/events/:user_id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  registerClient(req.params.user_id, res);
});

router.get("/ver", catchAsync(userController.VerID));
router.post("/verificarSessao", catchAsync(userController.VerificarSessao));

// Rotas protegidas (requerem autenticação)
router.use(authToken);
router.get("/logout", catchAsync(userController.Logout));

router.get("/", catchAsync(userController.VerUsuarios));
router.get("/:id", catchAsync(userController.VerUsuario));

router.patch("/:id", upload.single("photo"), catchAsync(userController.EditarUsuario));
router.delete("/", catchAsync(userController.DeletarUsuario));
router.delete("/:id", catchAsync(userController.DeletarUsuario));

router.post("/verificar", catchAsync(userController.Verificar));
router.post("/enviarCodigo", catchAsync(userController.EnviarCodigo));
router.patch("/redefinirSenha", catchAsync(userController.RedefinirSenha));

module.exports = router;