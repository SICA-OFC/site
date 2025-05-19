const jwt = require('jsonwebtoken');

async function gerarAccessToken(usuario) {
    return jwt.sign(
        { userId: usuario.id, email: usuario.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
}

async function gerarRefreshToken(usuario) {
    return jwt.sign(
        { userId: usuario.id, email: usuario.email },
        process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { gerarAccessToken, gerarRefreshToken };