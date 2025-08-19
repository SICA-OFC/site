require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.EMAIL_NODEMAILER_PASSWORD,
  },
});

const fs = require('fs');
const path = require('path');

function loadTemplate(templateName, variables) {
  const filePath = path.join(__dirname, '../emailTemplates', templateName);
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [key, val] of Object.entries(variables)) {
    const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    content = content.replace(re, val);
  }
  return content;
}

const enviarEmail = async (email, titulo, texto, html) => {
  const info = await transporter.sendMail({
    from: '"SICA - Sistema de InterCurso Acessível" <ofc.sica@gmail.com>',
    to: email,
    subject: titulo,
    text: texto,
    html: html,
  });
  return info;
};

module.exports = { loadTemplate, enviarEmail };
