const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

module.exports = {
    CriarTime: async (req, res) => {
        const { nome, member_ids } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: "Nome do time é obrigatório." });
        }
        if (!Array.isArray(member_ids) || member_ids.length === 0) {
            return res
                .status(400)
                .json({ erro: "O time deve ter pelo menos 1 membro." });
        }

        const time = await prisma.time.create({
            data: { nome },
        });

        const rows = member_ids.map((mId) => ({
            time_id: time.id,
            membro_id: mId,
            funcao: "jogador",
        }));

        await prisma.membros_time.createMany({
            data: rows,
            skipDuplicates: true,
        });

        res.status(201).json({
            mensagem: "Time criado com sucesso.",
            time,
            membros_adicionados: member_ids.length,
        });
    },

    EditarTime: async (req, res) => {
        const id = parseInt(req.params.id);
        const { nome, member_ids } = req.body;
        
        if (!id && id !== 0) {
            return res.status(400).json({ erro: "ID do time (id) é obrigatório." });
        }

        let time = await prisma.time.findUnique({ where: { id } });
        if (!time) {
            return res.status(404).json({ erro: "Time não encontrado." });
        }
        
        if (!Array.isArray(member_ids) || member_ids.length === 0) {
            return res
            .status(400)
            .json({ erro: "O time deve ter pelo menos 1 membro." });
        }
        
        if (nome) {
            time = await prisma.time.update({
                where: { id },
                data: { nome },
            });
        }
        
        const rows = member_ids.map((mId) => ({
            time_id: time.id,
            membro_id: mId,
            funcao: "jogador",
        }));
        
        await prisma.membros_time.deleteMany({
            where: { time_id: id },
        });
        
        await prisma.membros_time.createMany({
            data: rows,
            skipDuplicates: true,
        });
        
        res.json({
            mensagem: "Time atualizado com sucesso.",
        });
    },
    
    DeletarTime: async (req, res) => {
        const id = parseInt(req.params.id);

        if (!id && id !== 0) {
            return res.status(400).json({ erro: "ID do time (id) é obrigatório." });
        }

        const time = await prisma.time.findUnique({ where: { id } });
        if (!time) {
            return res.status(404).json({ erro: "Time não encontrado." });
        }

        await prisma.membros_time.deleteMany({
            where: { time_id: id },
        });

        await prisma.time.delete({
            where: { id },
        });

        res.json({
            mensagem: "Time deletado com sucesso.",
        });
    },

    VerTime: async (req, res) => {
        const id = req.params.id;
        if (!id && id !== 0) {
            return res.status(400).json({ erro: "ID do time (id) é obrigatório." });
        }

        const time = await prisma.time.findUnique({
            where: { id },
            include: {
                membros_time: true,
            },
        });

        if (!time) {
            return res.status(404).json({ erro: "Time não encontrado." });
        }

        res.json({
            mensagem: "Time encontrado.",
            time,
        });
    },

    VerTimes: async (req, res) => {
        const times = await prisma.time.findMany({
            orderBy: { id: "asc" },
            include: {
                membros_time: {
                    include: {
                        usuarios: {
                            select: {
                                id: true,
                                nome: true,
                            },
                        },
                    },
                },
            },
        });


        res.json({
            mensagem: "Lista de times retornada com sucesso.",
            times,
            total: times.length,
        });
    },
};
