const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const { loadTemplate, enviarEmail } = require('../services/enviarEmail.js');
const { verificarRefreshToken } = require("../services/verificarToken.js");
const { sendEvent } = require('../services/sseService.js');
const gerarCodigo = require('../services/gerarCodigo.js');
const { gerarAccessToken, gerarRefreshToken } = require('../services/gerarToken.js');
const BASE_URL = process.env.BASE_URL;

module.exports = {
  CriarUsuario: async (req, res) => {
    const { rm, nome, curso_id, email, data_nascimento, senha, telefone, tipo_usuario } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const codigo_verificacao = await gerarCodigo();

    const novoUsuario = await prisma.usuario.create({
      data: {
        rm,
        nome,
        curso_id,
        email,
        senha: senhaHash,
        telefone,
        data_nascimento,
        codigo_verificacao,
        codigo_criacao_em: new Date(),
        tipo_usuario
      },
    });

    const titulo = "Verificar Email";
    const texto = `Seu código de verificação é: ${codigo_verificacao}`;
    await enviarEmail(email, titulo, texto, null);
    const accessToken = await gerarAccessToken(novoUsuario);

    res
      .status(200)
      .json({
        mensagem: 'Cadastro bem-sucedido',
        accessToken
      });
  },

  LogarUsuario: async (req, res) => {
    const { email, senha } = req.body;

    let usuario = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (usuario.tentativas_login < 4) {
      if (!senhaCorreta) {
        await prisma.usuario.update({
          where: { email: email },
          data: { tentativas_login: (usuario.tentativas_login + 1) },
        });
        return res.status(400).json({ erro: "Senha ou email incorreto" });
      }
    }
    else {
      const { tentativas_login } = await prisma.usuario.update({
        where: { email: email },
        data: { tentativas_login: (usuario.tentativas_login + 1) },
        select: {
          tentativas_login: true,
        }
      });
      if (tentativas_login % 5 == 0) {
        const novoCodigo = await gerarCodigo();
        const action = 'unlock';
        await prisma.usuario.update({
          where: { email: email },
          data: {
            codigo_verificacao: novoCodigo,
            codigo_criacao_em: new Date(),
          },
        })
        const urlUnlock = `${BASE_URL}/usuario/approve/${usuario.id}/${action}?token=${novoCodigo}`;
        const urlLock = `${BASE_URL}/usuario/approve/${usuario.id}/lock?token=0`;
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

    usuario = await prisma.usuario.update({
      where: { email },
      data: { tentativas_login: 0 }
    })
    const accessToken = await gerarAccessToken(usuario);

    res.status(200).json({
      mensagem: "Login bem-sucedido",
      verificado: usuario.verificado,
      accessToken
    });
  },

  RegerarToken: async (req, res) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN];
    if (!refreshToken) {
      return res.status(401).json({ erro: 'Refresh token não encontrado' });
    }

    const payload = verificarRefreshToken(refreshToken);
    if (payload.erro) {
      return res.status(401).json({ erro: payload.erro });
    }

    const accessToken = gerarAccessToken({ id: payload.id, email: payload.email });

    // Opcional: rotacionar refresh token
    // const newRefreshToken = gerarRefreshToken(payload);
    // res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'Strict', secure: true });

    return res.status(200).json({ accessToken });
  },

  LiberarUsuario: async (req, res) => {
    const { user_id, action } = req.params;
    const { token } = req.query;

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(user_id) }
    });

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado.');
    }

    if (usuario.codigo_verificacao !== Number(token) && action == 'unlock') {
      return res.status(400).send('Token inválido.');
    }

    if (action == "unlock") {
      await prisma.usuario.update({
        where: { id: Number(user_id), codigo_verificacao: Number(token) },
        data: { tentativas_login: 0 }
      });
    }

    sendEvent(user_id, `account_${action}`, { user_id, status: action });

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

  Verificar: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ error: "Usuário não logado." });
    }

    const { codigo_verificacao } = req.body;

    if (!isNaN(parseInt(codigo_verificacao)) && data.codigo_verificacao == codigo_verificacao) {
      const codigo_criacao_em = new Date(data.codigo_criacao_em);
      const tempo = 15 * 60 * 1000; // 15 minutos
      const expirado = new Date().getTime() - codigo_criacao_em.getTime() > tempo;

      if (expirado) {
        await prisma.usuario.update({
          where: { email: data.email },
          data: {
            codigo_verificacao: null,
            codigo_criacao_em: null,
          },
        });
        return res.status(400).json({ erro: "O código de verificação expirou." });
      }

      const usuario = await prisma.usuario.update({
        where: { email: data.email },
        data: {
          verificado: true,
          codigo_verificacao: null,
          codigo_criacao_em: null,
        },
      });

      const accessToken = await gerarAccessToken(usuario);
      const refreshToken = await gerarRefreshToken(usuario);

      res
        .cookie(process.env.REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
        })
        .cookie(process.env.ACCESS_TOKEN, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: 15 * 60 * 1000, // 15 minut0
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
  },

  EnviarCodigo: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ error: "Usuário não logado." });
    }

    const novoCodigo = await gerarCodigo();

    await prisma.usuario.update({
      where: { email: data.email },
      data: {
        codigo_verificacao: novoCodigo,
        codigo_criacao_em: new Date(),
      },
    });

    const titulo = "Verificar Email";
    const texto = `Seu código de verificação é: ${novoCodigo}`;
    await enviarEmail(data.email, titulo, texto);

    res.status(200).json({ mensagem: "Código de verificação enviado com sucesso!" });
  },

  EditarUsuario: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ error: "Usuário não logado." });
    }

    const { nome, curso_id, email, data_nascimento, telefone } = req.body;

    const usuario = await prisma.usuario.update({
      where: { id: data.id },
      data: {
        nome: nome ?? undefined,
        curso_id: curso_id ?? undefined,
        email: email ?? undefined,
        data_nascimento: data_nascimento ?? undefined,
        telefone: telefone ?? undefined
      },
    });

    res.status(200).json({
      mensagem: "Usuário Editado!",
      usuario: {
        nome: usuario.nome,
        curso_id: usuario.curso_id,
        email: usuario.email,
        data_nascimento: usuario.data_nascimento,
        telefone: usuario.telefone,
      },
    });
  },

  RedefinirSenha: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ error: "Usuário não logado." });
    }

    const { senha } = req.body;

    let senhaHash;
    if (senha && senha.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      senhaHash = await bcrypt.hash(senha, salt);
    }
    const usuario = await prisma.usuario.update({
      where: { id: data.id },
      data: {
        senha: senhaHash ?? undefined,
      },
    });

    res.status(200).json({
      mensagem: "Usuário teve sua senha alterada!",
      usuario: {
        nome: usuario.nome,
        senha: usuario.senha
      },
    });
  },

  DeletarUsuario: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ error: "Usuário não logado." });
    }

    const usuario = await prisma.usuario.delete({
      where: { id: data.id },
    });

    res.status(200).json({
      mensagem: "Usuário Deletado!",
      usuario: usuario.id,
    });
  },

  VerificarSessao: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "O usuário está logado.", usuario: data });
  },

  Logout: async (req, res) => {
    return res.clearCookie(process.env.REFRESH_TOKEN).status(200).json({ mensagem: 'Logout realizado com sucesso' });
  }
}