const { verificarAccessToken, verificarRefreshToken } = require('../services/verificarToken');
const { PrismaClient } = require("../generated/prisma/client.js");
const { gerarAccessToken } = require('../services/gerarToken.js');
const prisma = new PrismaClient();

module.exports = async function authToken(req, res, next) {
    let scheme;
    let access_token = req.cookies[process.env.ACCESS_TOKEN]
    let refresh_token_data;
    
    if (!req.cookies[process.env.ACCESS_TOKEN] && !req.cookies[process.env.REFRESH_TOKEN]) {
        const authHeader = req.headers.authorization || '';
        [scheme, access_token] = authHeader.split(' ');
        
        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ erro: 'Token de acesso não fornecido' });
        }
    } else {req.cookies[process.env.REFRESH_TOKEN]} {
        const refresh_token = req.cookies[process.env.REFRESH_TOKEN]
        refresh_token_data = verificarRefreshToken(refresh_token);
        if (refresh_token_data.erro) {
            return res.status(401).json({ erro: refresh_token_data.erro });
        }

        access_token = await gerarAccessToken(refresh_token_data);
        res
        .cookie(process.env.ACCESS_TOKEN, access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 15 * 60 * 1000, // 15 minuto
        })
    }

    const data = verificarAccessToken(access_token);
    if (data.erro) {
        return res.status(401).json({ erro: data.erro });
    }

    const usuario = await prisma.usuarios.findUnique({
        where: { email: data.email }
    });

    if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    req.user = usuario;
    next();
};
