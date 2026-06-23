import nodemailer from "nodemailer";

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,   
      pass: process.env.MAIL_PASS,
    },
  });

  static async sendWelcomeEmail(email: string, name: string) {
    await this.transporter.sendMail({
      from: `"E-commerce Store" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Bienvenido a nuestra tienda",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h1>Bienvenido, ${name}</h1>
          <p>Tu cuenta ha sido creada exitosamente.</p>
        </div>
      `,
    });
  }
}