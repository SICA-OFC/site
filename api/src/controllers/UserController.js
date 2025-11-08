const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { loadTemplate, enviarEmail } = require("../services/enviarEmail.js");
const { verificarAccessToken } = require("../services/verificarToken.js");
const gerarCodigo = require("../services/gerarCodigo.js");
const { gerarAccessToken, gerarRefreshToken, regerarAccessToken } = require("../services/gerarToken.js");
const { userSchema, loginSchema, editUserSchema, verifySchema } = require("../schemas/userSchema.js");

module.exports = {
  CriarUsuario: async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ erro: error.details[0].message });
    }

    const { rm, nome, curso_id, email, data_nascimento, senha, telefone, codigo } = req.body;

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
    const codigo_verificacao = await gerarCodigo();

    let codigoCerto = false;

    if (codigo && codigo != process.env.ADMIN_COD) {
      return res.status(400).json({ erro: "Código Inválido" });
    }

    if (codigo && codigo == process.env.ADMIN_COD) {
      codigoCerto = true;
    }

    let imageUrl = null;
    if (req.file) {
      const randomName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.webp`;
      const uploadDir = path.join(process.cwd(), "uploads");
      const uploadPath = path.join(uploadDir, randomName);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await sharp(req.file.buffer).webp({ quality: 50 }).toFile(uploadPath);

      imageUrl = `http://localhost:3000/uploads/${randomName}`;
    }

    const novoUsuario = await prisma.usuarios.create({
      data: {
        rm,
        nome,
        curso_id,
        email,
        senha: senhaHash,
        telefone,
        data_nascimento: new Date(data_nascimento),
        codigo_verificacao,
        codigo_gerado_em: new Date(),
        tipo_usuario: codigoCerto ? "professor" : "aluno",
        foto_perfil: imageUrl ?? undefined,
      },
    });

    const titulo = "Confirmar Cadastro";
    const texto = `Seu código de verificação é: ${codigo_verificacao}`;
    enviarEmail(email, titulo, texto, null);
    const accessToken = await gerarAccessToken(novoUsuario);

    res.status(200).json({
      accessToken,
    });
  },

  LogarUsuario: async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ erro: error.details[0].message });
    }

    const { email, senha } = req.body;

    let usuario = await prisma.usuarios.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Email ou Senha incorreto" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (usuario.tentativas_login < 4) {
      if (!senhaCorreta) {
        await prisma.usuarios.update({
          where: { email: email },
          data: { tentativas_login: usuario.tentativas_login + 1 },
        });
        return res.status(400).json({ erro: "Email ou Senha incorreto" });
      }
    } else {
      const { tentativas_login } = await prisma.usuarios.update({
        where: { email: email },
        data: { tentativas_login: usuario.tentativas_login + 1 },
        select: {
          tentativas_login: true,
        },
      });

      if (tentativas_login % 5 != 0) {
        return res.status(423).json({ erro: "Sua conta foi bloqueada. Redefina a senha ou tente novamente amanhã" });
      } else {
        const codigo_verificacao = await gerarCodigo();
        await prisma.usuarios.update({
          where: { email: email },
          data: {
            codigo_verificacao,
            codigo_gerado_em: new Date(),
          },
        });
        // const urlLock = `${BASE_URL}/usuario/approve/${usuario.id}/lock?token=0`;
        // const titulo = "alerta de segurança";
        // const texto = ``;

        // const html = loadTemplate("blockedAccount.html", {
        //   nome: usuario.nome,
        //   urlUnlock,
        //   urlLock,
        // });
        // enviarEmail(email, titulo, texto, html);

        return res.status(423).json({ erro: "Sua conta foi bloqueada. Um e-mail com instruções foi enviado." });
      }
    }

    const codigo_verificacao = await gerarCodigo();

    usuario = await prisma.usuarios.update({
      where: { email },
      data: { tentativas_login: 0, codigo_verificacao, codigo_gerado_em: new Date() },
    });

    const titulo = "Confirmar Login";
    const texto = `Seu código de verificação é: ${codigo_verificacao}`;
    enviarEmail(email, titulo, texto, null);
    const accessToken = await gerarAccessToken(usuario);

    res.status(200).json({
      accessToken,
    });
  },

  VerID: async (req, res) => {
    const email = req.headers.email;

    if (!email) {
      return res.status(400).json({ erro: "Email não informado no header." });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.json({ id: usuario.id });
  },

  Verificar: async (req, res) => {
    const { error } = verifySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ erro: error.details[0].message });
    }

    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    const { codigo_verificacao } = req.body;

    if (!isNaN(parseInt(codigo_verificacao)) && data.codigo_verificacao == codigo_verificacao) {
      const codigo_gerado_em = new Date(data.codigo_gerado_em);
      const tempo = 15 * 60 * 1000; // 15 minutos
      const expirado = new Date().getTime() - codigo_gerado_em.getTime() > tempo;

      if (expirado) {
        await prisma.usuarios.update({
          where: { email: data.email },
          data: {
            codigo_verificacao: null,
            codigo_gerado_em: null,
          },
        });
        return res.status(400).json({ erro: "O código de verificação expirou." });
      }

      const usuario = await prisma.usuarios.update({
        where: { email: data.email },
        data: {
          codigo_verificacao: null,
          codigo_gerado_em: null,
        },
      });

      const accessToken = await gerarAccessToken(usuario);
      const refreshToken = await gerarRefreshToken(usuario);

      res
        .cookie(process.env.REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        })
        .cookie(process.env.ACCESS_TOKEN, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 15 * 60 * 1000, // 15 minut0
        })
        .status(200)
        .json({
          accessToken,
          refreshToken,
        });
    } else {
      return res.status(400).json({ erro: "Código de verificação inválido." });
    }
  },

  EnviarCodigo: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    const novoCodigo = await gerarCodigo();

    await prisma.usuarios.update({
      where: { email: data.email },
      data: {
        codigo_verificacao: novoCodigo,
        codigo_gerado_em: new Date(),
      },
    });

    const titulo = "Verificar Email";
    const texto = `Seu código de verificação é: ${novoCodigo}`;
    await enviarEmail(data.email, titulo, texto);

    res.status(201);
  },

  EditarUsuario: async (req, res) => {
    const { error } = editUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ erro: error.details[0].message });
    }

    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    if (parseInt(req.params.id) && data.tipo_usuario == "aluno") {
      return res
        .status(404)
        .json({ erro: "Usuário não possui permissão de administrador para manipular outro usuário." });
    }

    const id = parseInt(req.params.id);
    const { nome, curso_id, email, data_nascimento, telefone, modalidades } = req.body;

    let imageUrl = null;
    if (req.file) {
      const usuarioAtual = await prisma.usuarios.findUnique({
        where: { id: id || data.id },
      });

      if (usuarioAtual.foto_perfil) {
        const oldFilePath = path.join(process.cwd(), "uploads", path.basename(usuarioAtual.foto_perfil));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const randomName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.webp`;
      const uploadDir = path.join(process.cwd(), "uploads");
      const uploadPath = path.join(uploadDir, randomName);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await sharp(req.file.buffer).webp({ quality: 50 }).toFile(uploadPath);

      imageUrl = `http://localhost:3000/uploads/${randomName}`;
    }

    const usuario = await prisma.usuarios.update({
      where: { id: id || data.id },
      data: {
        nome: nome ?? undefined,
        email: email ?? undefined,
        data_nascimento: new Date(data_nascimento) ?? undefined,
        telefone: telefone ?? undefined,
        foto_perfil: imageUrl ?? undefined,
        cursos: { connect: { id: parseInt(curso_id) ?? undefined } },
      },
    });

    if (modalidades.length > 0) {
      await prisma.usuario_modalidades.deleteMany({
        where: { usuario_id: id || data.id },
      });

      const modalidadesRows = modalidades.map((mId) => ({
        usuario_id: id || data.id,
        modalidade_id: parseInt(mId),
      }));

      await prisma.usuario_modalidades.createMany({
        data: modalidadesRows,
        skipDuplicates: true,
      });
    }

    if (!id && data.email != email) {
      const accessToken = await gerarAccessToken(usuario);
      const refreshToken = await gerarRefreshToken(usuario);

      res
        .cookie(process.env.REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          overwrite: true,
        })
        .cookie(process.env.ACCESS_TOKEN, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 15 * 60 * 1000,
          overwrite: true,
        });
    }

    res.status(200).json({
      nome: usuario.nome,
    });
  },

  RedefinirSenha: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    const { senha } = req.body;

    let senhaHash;
    if (senha && senha.trim() !== "") {
      const salt = await bcrypt.genSalt(12);
      senhaHash = await bcrypt.hash(senha, salt);
    }
    const usuario = await prisma.usuarios.update({
      where: { id: data.id },
      data: {
        senha: senhaHash ?? undefined,
      },
    });

    res.status(201);
  },

  DeletarUsuario: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    if (parseInt(req.params.id) && data.tipo_usuario == "aluno") {
      return res
        .status(404)
        .json({ erro: "Usuário não possui permissão de administrador para manipular outro usuário." });
    }
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuarios.delete({
      where: { id: id || data.id },
    });

    if (usuario.foto_perfil) {
      const oldFilePath = path.join(process.cwd(), "uploads", path.basename(usuario.foto_perfil));
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    res.clearCookie(process.env.REFRESH_TOKEN).clearCookie(process.env.ACCESS_TOKEN).status(200).json({
      usuario: usuario.id,
    });
  },

  VerificarSessao: async (req, res) => {
    let access_token = req.cookies[process.env.ACCESS_TOKEN];

    if (!access_token) {
      if (req.cookies[process.env.REFRESH_TOKEN]) {
        try {
          access_token = await regerarAccessToken(req.cookies[process.env.REFRESH_TOKEN]);
          res.cookie(process.env.ACCESS_TOKEN, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 15 * 60 * 1000,
          });
        } catch (err) {
          return res.status(401).json({ erro: "Refresh token inválido ou expirado." });
        }
      } else {
        return res.status(404).json({ erro: "Usuário não logado." });
      }
    }

    const data = verificarAccessToken(access_token);
    if (data.erro) {
      return res.status(401).json({ erro: data.erro });
    }

    const { tipo_usuario } = await prisma.usuarios.findUnique({
      where: { id: data.id },
      select: {
        tipo_usuario: true,
      },
    });

    if (!tipo_usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ tipo_usuario });
  },

  VerUsuario: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }

    const id = parseInt(req.params.id);
    const usuario = await prisma.usuarios.findUnique({
      where: { id: id || data.id },
      select: {
        rm: true,
        nome: true,
        data_nascimento: true,
        curso_id: true,
        email: true,
        telefone: true,
        foto_perfil: true,
        tipo_usuario: true,
        cursos: {
          select: {
            periodo: true,
          },
        },
        usuario_modalidades: {
          select: {
            modalidade_id: true,
          },
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json({ usuario });
  },

  VerUsuarios: async (req, res) => {
    const data = req.user;
    if (!data) {
      return res.status(404).json({ erro: "Usuário não logado." });
    }
    if (data.tipo_usuario == "aluno") {
      return res.status(404).json({ erro: "Usuário sem permissões de administrador." });
    }

    const usuarios = await prisma.usuarios.findMany({
      where: { tipo_usuario: "aluno" },
      orderBy: { id: "asc" },
      select: {
        id: true,
        rm: true,
        nome: true,
        email: true,
        data_nascimento: true,
        telefone: true,
        curso_id: true,
        foto_perfil: true,
        cursos: true,
        usuario_modalidades: {
          select: {
            modalidade_id: true,
          },
        },
      },
    });

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ erro: "Nenhum aluno encontrado." });
    }

    res.json({ usuarios });
  },

  Logout: async (req, res) => {
    return res
      .clearCookie(process.env.REFRESH_TOKEN)
      .clearCookie(process.env.ACCESS_TOKEN)
      .status(201)
      .json({ success: true });
  },
};
