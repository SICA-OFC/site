const jwt = require("jsonwebtoken");

const verificarAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return { erro: "Token inválido", err };
  }
};

const verificarRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return { erro: "Token inválido", err };
  }
};

module.exports = { verificarAccessToken, verificarRefreshToken };