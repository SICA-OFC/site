const { PrismaClientKnownRequestError, PrismaClientInitializationError } = require("../generated/prisma/runtime/library");

const errorHandler = function (err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || "Erro interno de servidor";

  const payload = { erro: message };
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }
  
  if (err instanceof PrismaClientInitializationError) {
        return res.status(400).json({ erro: `O Banco de Dados não está online.` });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(400).json({ erro: `Campo Duplicado: ${err.meta.target}` });
      case "P2014":
        return res.status(400).json({ erro: `ID Inválido: ${err.meta.target}` });
      case "P2003":
        return res.status(400).json({ erro: `Campo Inválido: ${err.meta.target}` });
      default:
        return res.status(500).json({ erro: `Algo Deu Errado: ${err.meta.target}`, err });
    }
  }
  res.status(status).json(payload);
};

module.exports = errorHandler;
