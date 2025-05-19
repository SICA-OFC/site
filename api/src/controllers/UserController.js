const bcrypt = require("bcryptjs");

const { PrismaClient, tipo_usuario } = require("../generated/prisma/client");
const prisma = new PrismaClient();

const { loadTemplate, enviarEmail } = require('../services/enviarEmail.js');
const { verificarAcessToken, verificarRefreshToken } = require("../services/verificarToken.js");
const { sendEvent } = require('../services/sseService.js');
const gerarCodigo = require('../services/gerarCodigo.js');
const { gerarAccessToken, gerarRefreshToken } = require('../services/gerarToken.js');
const BASE_URL = process.env.BASE_URL;

module.exports = {
  CriarUsuario: async (req, res) => {
    const { rm, nome, curso, email, datanascimento, senha, telefone, tipousuario } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);
    const codigoverificacao = await gerarCodigo();

    const novoUsuario = await prisma.usuario.create({
      data: {
        rm,
        nome,
        curso,
        email,
        datanascimento,
        senha: senhaHash,
        telefone,
        codigoverificacao,
        datacriacaocodigo: new Date(),
        tipousuario
      },
    });

    const titulo = "Verificar Email";
    const texto = `Seu código de verificação é: ${codigoverificacao}`;
    await enviarEmail(email, titulo, texto, null);
    const accessToken = await gerarAccessToken(novoUsuario);

    res
      .status(200)
      .json({
        mensagem: 'Cadastro bem-sucedido',
        accessToken
      });
  },

  GerarToken: async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (usuario.controle < 4) {
      if (!senhaCorreta) {
        await prisma.usuario.update({
          where: { email: email },
          data: { controle: (usuario.controle + 1) },
        });
        return res.status(400).json({ erro: "Senha ou email incorreto" });
      }
    }
    else {
      const { controle } = await prisma.usuario.update({
        where: { email: email },
        data: { controle: (usuario.controle + 1) },
        select: {
          controle: true,
        }
      });
      if (controle % 5 == 0) {
        const novoCodigo = await gerarCodigo();
        const action = 'unlock';
        await prisma.usuario.update({
          where: { email: email },
          data: {
            codigoverificacao: novoCodigo,
            datacriacaocodigo: new Date(),
          },
        })
        const urlUnlock = `${BASE_URL}/account/approve/${usuario.id}/${action}?token=${novoCodigo}`;
        const urlLock = `${BASE_URL}/account/approve/${usuario.id}/lock?token=0`;
        const titulo = "alerta de segurança";
        const texto = ``;

        const html = loadTemplate('blockedAccount.html', {
          nome: usuario.nome,
          urlUnlock,
          urlLock
        });

        enviarEmail(email, titulo, texto, html);
        return res.status(423).json({ erro: "Sua conta foi bloqueada. Um e-mail com instruções foi enviado." });
      }
      return res.status(423).json({ erro: "Sua conta foi bloqueada" });
    }

    const accessToken = await gerarAccessToken(usuario);

    res
      .status(200)
      .json({
        mensagem: 'Token de acesso gerado com sucesso',
        accessToken
      });
  },

  EnviarCodigo: async (req, res) => {
    let data;
    if (req.body.email) {
      data = { "email": req.body.email, }
    }
    else {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
      }
      data = await verificarAcessToken(token);
    }

    if (data.email || req.body.email) {
      const usuario = await prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      const novoCodigo = await gerarCodigo();

      await prisma.usuario.update({
        where: { email: data.email },
        data: {
          codigoverificacao: novoCodigo,
          datacriacaocodigo: new Date(),
        },
      });

      const titulo = "Verificar Email";
      const texto = `Seu código de verificação é: ${novoCodigo}`;
      await enviarEmail(data.email, titulo, texto);

      res.status(200).json({ mensagem: "Código de verificação enviado com sucesso!" });
    } else {
      res.status(400).json(data);
    }
  },

  Verificar: async (req, res) => {
    const data = req.user;

    if (data) {
      const { codigoverificacao } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      if (!isNaN(parseInt(codigoverificacao)) && usuario.codigoverificacao == codigoverificacao) {
        const datacriacaocodigo = new Date(usuario.datacriacaocodigo);
        const umaHora = 60 * 60 * 1000;
        const expirado =
          new Date().getTime() - datacriacaocodigo.getTime() > umaHora;

        if (expirado) {
          return res
            .status(400)
            .json({ erro: "O código de verificação expirou." });
        }

        await prisma.usuario.update({
          where: { email: data.email },
          data: {
            verificado: true,
            codigoverificacao: null,
            datacriacaocodigo: null,
          },
        });

        const accessToken = await gerarAccessToken(usuario);
        const refreshToken = await gerarRefreshToken(usuario);

        res
          .cookie(process.env.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
          })
          .status(200)
          .json({
            mensagem: 'Usuário verificado com sucesso!',
            accessToken,
            refreshToken
          });
      } else {
        return res
          .status(400)
          .json({ erro: "Código de verificação inválido." });
      }
    };
  },

  VerificarSessao: async (req, res) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN];

    if (!refreshToken) {
      return res.status(401).json({ erro: "Nenhuma sessão ativa" });
    }

    const decoded = await verificarRefreshToken(refreshToken);
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const accessToken = await gerarAccessToken(usuario);
    res.json({ mensagem: "O usuário está logado.", usuario: decoded, accessToken });
  },

  LogarUsuario: async (req, res) => {
    const data = req.user;

    if (data) {
      const usuario = await prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (!usuario) {
        return res.status(400).json({ erro: "Usuário não encontrado" });
      }

      res.status(200).json({
        mensagem: "Login bem-sucedido",
        verificado: usuario.verificado
      });

      await prisma.usuario.update({
        where: { email: usuario.email },
        data: { controle: 0 }
      })
    };
  },

  DeletarUsuario: async (req, res) => {
    const data = req.user;

    if (data) {
      const usuario = await prisma.usuario.delete({
        where: { id: data.userId },
      });

      if (!usuario) {
        return res.status(400).json({ erro: "Usuário não encontrado" });
      }

      res.status(200).json({
        mensagem: "Usuário Deletado!",
        usuario: data.userId,
      });
    };
  },

  EditarUsuario: async (req, res) => {
    const data = req.user;

    if (data) {
      const { nome, curso, email, senha, telefone } = req.body;

      let senhaHash;
      if (senha && senha.trim() !== '') {
        senhaHash = await bcrypt.hash(senha, 10);
      }
      const usuario = await prisma.usuario.update({
        where: { id: data.userId },
        data: {
          nome: nome ?? undefined,
          curso: curso ?? undefined,
          email: email ?? undefined,
          senha: senhaHash ?? undefined,
          telefone: telefone ?? undefined,
        },
      });

      res.status(200).json({
        mensagem: "Usuário Editado!",
        usuario: {
          nome: usuario.nome,
          curso: usuario.curso,
          email: usuario.email,
          telefone: usuario.telefone,
        },
      });
    }
  },

  RedefinirSenha: async (req, res) => {
    const data = req.user;

    if (data) {
      const { senha } = req.body;

      let senhaHash;
      if (senha && senha.trim() !== '') {
        senhaHash = await bcrypt.hash(senha, 10);
      }
      const usuario = await prisma.usuario.update({
        where: { id: data.userId },
        data: {
          senha: senhaHash ?? undefined,
        },
      });

      res.status(200).json({
        mensagem: "Usuário teve sua senha alterada!",
        usuario: {
          nome: usuario.nome,
          curso: usuario.curso,
          email: usuario.email,
          telefone: usuario.telefone,
        },
      });
    }
  },

  LiberarUsuario: async (req, res) => {
    const { userId, action } = req.params;
    const { token } = req.query;

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(userId) }
    });

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado.');
    }

    if (usuario.codigoverificacao !== Number(token) && action == 'unlock') {
      return res.status(400).send('Token inválido.');
    }

    if (action == "unlock") {
      await prisma.usuario.update({
        where: { id: Number(userId), codigoverificacao: Number(token) },
        data: { controle: 0 }
      });
    }

    sendEvent(userId, `account_${action}`, { userId, status: action });

    return res.status(200).send(`
        <h2>Conta ${action === 'unlock'
        ? '✅ Liberada'
        : '⛔ Mantida bloqueada'
      }!</h2>
        <p>Você pode fechar esta aba.</p>
      `);
  },


  VerUsuario: async (req, res) => {
    const email = req.headers.email;

    if (!email) {
      return res.status(400).json({ error: "Email não informado no header." });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json({ id: usuario.id });
  },

  Logout: async (req, res) => {
    return res.clearCookie(process.env.REFRESH_TOKEN).status(200).json({ mensagem: 'Logout realizado com sucesso' });
  }

}