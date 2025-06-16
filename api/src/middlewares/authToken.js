// middlewares/authToken.js
const { gerarAccessToken } = require('../services/gerarToken');
const { verificarAcessToken, verificarRefreshToken } = require('../services/verificarToken');

module.exports = async function authToken(req, res, next) {
    try {
        let refreshToken = req.cookies[process.env.REFRESH_TOKEN];
        let accessToken;

        if (!refreshToken) {
            const authHeader = req.headers.authorization || '';
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
        }
        else {
            const decoded = verificarRefreshToken(refreshToken);
            accessToken = gerarAccessToken(decoded);
        }

        const data = await verificarAcessToken(accessToken);
        if (data.erro) {
            return res.status(401).json({ erro: data.erro });
        }

        req.user = {
            userId: data.userId,
            email: data.email
        };

        next();
    } catch (err) {
        console.error('authToken error:', err);
        res.clearCookie('token');
        return res.status(500).json({ erro: 'Erro interno ao validar token' });
    }
};
