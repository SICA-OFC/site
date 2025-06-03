const express = require("express");
const router = express.Router();
const UserController = require(`../controllers/UserController`);
const authToken = require("../middlewares/authToken");
const catchAsync = require('../middlewares/catchAsync');
const captcha = require("../services/captcha");

// Rotas públicas
router.get("/captcha", catchAsync(captcha));

// Rotas protegidas (requerem autenticação)
router.use(authToken);
router.post("/verificar", catchAsync(UserController.Verificar));

module.exports = router;