const { regerarAccessToken } = require('../services/gerarToken.js');
const { verificarAccessToken } = require('../services/verificarToken');
const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

module.exports = async function authToken(req, res, next) {
  let access_token = req.cookies[process.env.ACCESS_TOKEN];
  if (!access_token && req.cookies[process.env.REFRESH_TOKEN]) {
    access_token = await regerarAccessToken(req.cookies[process.env.REFRESH_TOKEN]);

    res.cookie(process.env.ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });
  }

  if (!access_token && !req.cookies[process.env.REFRESH_TOKEN]) {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ erro: 'Token de acesso não fornecido' });
    }

    access_token = token;
  }

  const data = verificarAccessToken(access_token);
  if (data.erro) {
    return res.status(401).json({ erro: data.erro });
  }

  const usuario = await prisma.usuarios.findUnique({
    where: { email: data.email }
  });

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado." + data.email });
  }

  req.user = usuario;
  next();
};
