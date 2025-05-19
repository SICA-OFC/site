const crypto = require("crypto");

const gerarCodigo = async () => {
    const codigo = crypto.randomInt(100000, 999999);
    return codigo;
};

module.exports = gerarCodigo;