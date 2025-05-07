const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ofc.sica@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const enviarEmail = async (email, titulo, texto) => {
  const info = await transporter.sendMail({
    from: '"Sistema de Intercurso Acessível - SICA" <ofc_sica@gmail.com>',
    to: email,
    subject: titulo,
    text: texto,
  });
  return info;
};

module.exports = enviarEmail;
