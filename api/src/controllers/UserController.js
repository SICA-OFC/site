const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();
const enviarEmail = require("../services/enviarEmail.js");

module.exports = {
  GerarToken: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await prisma.login.findUnique({
        where: { email: email },
      });

      if (!usuario) {
        return res.status(400).json({ erro: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ erro: "Senha incorreta" });
      }

      const token = jwt.sign(
        { userId: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (error) {
      res.status(400).json({
        erro: "Erro ao gerar token",
        detalhe: {
          tipo: error.name || "ErroDesconhecido",
          detalhes: error.message,
        },
      });
    }
  },

  CriarUsuario: async (req, res) => {
    const { rm, nome, curso, email, senha, telefone, codigoverificacao, datacriacaocodigo } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    try {
      const novoUsuario = await prisma.login.create({
        data: {
          rm,
          nome,
          curso,
          email,
          senha: senhaHash,
          telefone,
          codigoverificacao,
          datacriacaocodigo
        },
      });
      const token = jwt.sign(
        { userId: novoUsuario.id, email: novoUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const titulo = "Verificar Email";
      const texto = `Seu código de verificação é: ${codigoverificacao}`;
      await enviarEmail(email, titulo, texto);
      res.json({ mensagem: "Usuário criado com sucesso", novoUsuario, token });
    } catch (error) {
      res.status(400).json({
        erro: "Erro ao criar usuário",
        detalhe: {
          tipo: error.name || "ErroDesconhecido",
          detalhes: error.message,
        },
      });
    }
  },

  EnviarCodigo: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      try {
        const usuario = await prisma.login.findUnique({
          where: { email: decoded.email },
        });

        if (!usuario) {
          return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        const novoCodigo = Math.floor(99999 + Math.random() * 900000);

        await prisma.login.update({
          where: { email: decoded.email },
          data: {
            codigoverificacao: novoCodigo,
            datacriacaocodigo: new Date(),
          },
        });

        const titulo = "Verificar Email";
        const texto = `Seu código de verificação é: ${novoCodigo}`;
        await enviarEmail(decoded.email, titulo, texto);

        res.json({ mensagem: "Código de verificação enviado com sucesso!" });
      } catch (error) {
        res
          .status(500)
          .json({ erro: "Erro ao enviar código", detalhe: error.message });
      }
    });
  },

  VerificarCadastro: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      const { codigoVerificacao } = req.body;

      try {
        const usuario = await prisma.login.findUnique({
          where: { email: decoded.email },
        });

        if (!usuario) {
          return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        if (usuario.codigoverificacao == codigoVerificacao) {
          const dataCriacaoCodigo = new Date(usuario.dataCriacaoCodigo);
          const umaHora = 60 * 60 * 1000;
          const expirado =
            new Date().getTime() - dataCriacaoCodigo.getTime() > umaHora;

          if (expirado) {
            return res
              .status(400)
              .json({ erro: "O código de verificação expirou." });
          }

          await prisma.login.update({
            where: { email: decoded.email },
            data: {
              verificado: true,
              codigoverificacao: null,
              datacriacaocodigo: null,
            },
          });

          res.json({ mensagem: "Usuário verificado com sucesso!" });
        } else {
          return res
            .status(400)
            .json({ erro: "Código de verificação inválido." });
        }
      } catch (error) {
        res
          .status(500)
          .json({ erro: "Erro ao verificar usuário", detalhe: error.message });
      }
    });
  },

  VerificarLogin: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      const { codigoVerificacao } = req.body;

      try {
        const usuario = await prisma.login.findUnique({
          where: { email: decoded.email },
        });

        if (!usuario) {
          return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        if (usuario.codigoverificacao == codigoVerificacao) {
          const dataCriacaoCodigo = new Date(usuario.dataCriacaoCodigo);
          const umaHora = 60 * 60 * 1000;
          const expirado =
            new Date().getTime() - dataCriacaoCodigo.getTime() > umaHora;

          if (expirado) {
            return res
              .status(400)
              .json({ erro: "O código de verificação expirou." });
          }

          await prisma.login.update({
            where: { email: decoded.email },
            data: {
              verificado: true,
              codigoverificacao: null,
              datacriacaocodigo: null,
            },
          });

          res.json({ mensagem: "Usuário logado com sucesso!" });
        } else {
          return res
            .status(400)
            .json({ erro: "Código de verificação inválido." });
        }
      } catch (error) {
        res
          .status(500)
          .json({ erro: "Erro ao verificar usuário", detalhe: error.message });
      }
    });
  },

  LogarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }
      try {
        const usuario = await prisma.login.findUnique({
          where: { email: decoded.email },
        });

        if (!usuario) {
          return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        res.json({
          mensagem: "Bem-vindo ao conteúdo protegido!",
          usuario,
        });
      } catch (error) {
        res.status(400).json({
          erro: "Erro ao executar comando SQL",
          detalhe: {
            tipo: error.name || "ErroDesconhecido",
            detalhes: error.message,
          },
        });
      }

    });
  },

  DeletarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      try {
        const usuario = await prisma.login.delete({
          where: { id: decoded.userId },
        });

        if (!usuario) {
          return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        res.json({
          mensagem: "Usuário Deletado!",
          usuario: decoded.userId,
        });
      } catch (error) {
        res.status(400).json({
          erro: "Erro ao deletar usuário",
          detalhe: {
            tipo: error.name || "ErroDesconhecido",
            detalhes: error.message,
          },
        });
      }
    });
  },

  EditarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    let data;

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }
      data = decoded;
    });

    if (data) {
      const { nome, curso, email, senha, telefone } = req.body;

      let senhaHash;
      if (senha) {
        senhaHash = await bcrypt.hash(senha, 10);
      }

      try {
        const usuario = await prisma.login.update({
          where: { id: data.userId },
          data: {
            nome: nome ?? undefined,
            curso: curso ?? undefined,
            email: email ?? undefined,
            senha: senhaHash ?? undefined,
            telefone: telefone ?? undefined,
          },
        });

        res.json({
          mensagem: "Usuário Editado!",
          usuario,
        });
      } catch (error) {
        res.status(400).json({
          erro: "Erro ao editar usuário",
          detalhe: {
            tipo: error.name || "ErroDesconhecido",
            detalhes: error.message,
          },
        });
      }
    }
  },
};
