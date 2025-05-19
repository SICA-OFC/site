// middlewares/authToken.js
const { verificarAcessToken } = require('../services/verificarToken');

module.exports = async function authToken(req, res, next) {
    try {
        let accessToken = req.cookies.accessToken;

        if (!accessToken) {
            const authHeader = req.headers.authorization || '';
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
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
