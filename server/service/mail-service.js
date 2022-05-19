// Сервис для отправки писем на почту с активацией аккаунта
const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    // Отправка писем с подтверждением регистрации
    this.transporter = nodemailer.createTransport({
      secure: false, // только для дев среды
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
      <div>
        <h1>Для активации аккаунта перейдите по ссылке</h1>
        <a target="_blank" href="${link}">Активировать</a>
      </div>`,
    });
  }
}

module.exports = new MailService();
