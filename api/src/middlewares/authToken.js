const { verificarAccessToken } = require('../services/verificarToken');
const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

module.exports = async function authToken(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ erro: 'Token de acesso não fornecido' });
    }

    const data = verificarAccessToken(token);
    if (data.erro) {
        return res.status(401).json({ erro: data.erro });
    }

    const usuario = await prisma.usuario.findUnique({
        where: { email: data.email }
    });

    if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    req.user = usuario;
    next();
};
