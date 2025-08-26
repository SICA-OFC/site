const errorHandler = function (err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno de servidor';

  const payload = { erro: message };
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  if (err.code === "P2002" && err.meta.target.includes("nome")) {
    return res.status(400).json({ erro: "Nome repetido" });
  }
  res.status(status).json(payload);
}

module.exports = errorHandler;
