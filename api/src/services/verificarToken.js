const jwt = require("jsonwebtoken");

const verificarAcessToken = async (token) => {
  const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return ({ erro: "Token inválido" });
    }
    return decoded;
  });
  return data;
};

const verificarRefreshToken = async (token) => {
  const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return ({ erro: "Token inválido" });
    }
    return decoded;
  });
  return data;
};

module.exports = { verificarAcessToken, verificarRefreshToken };