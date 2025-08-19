const jwt = require("jsonwebtoken");
const { verificarRefreshToken } = require("./verificarToken");

async function gerarAccessToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

async function gerarRefreshToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, process.env.REFRESH_TOKEN_SECRET);
}

async function regerarAccessToken(refresh_token) {
  const refresh_token_data = verificarRefreshToken(refresh_token);
  if (refresh_token_data.erro) {
    throw new Error(refresh_token_data.erro);
  }

  return await gerarAccessToken(refresh_token_data);
}

module.exports = { gerarAccessToken, gerarRefreshToken, regerarAccessToken };
