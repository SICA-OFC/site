const errorHandler = function(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno de servidor';

  const payload = { erro: message };
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;
