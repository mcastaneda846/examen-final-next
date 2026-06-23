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
      from: `"Sabores Caseros" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "¡Bienvenido a Sabores Caseros!",
      html: `
      <div style="background:#f4f4f5;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
        <div style="
          max-width:500px;
          margin:0 auto;
          background:#ffffff;
          border-radius:20px;
          overflow:hidden;
          box-shadow:0 8px 24px rgba(0,0,0,.08);
        ">
          
          <div style="
            background:#ea580c;
            padding:30px;
            text-align:center;
          ">
            <h1 style="
              color:white;
              margin:0;
              font-size:28px;
            ">
              Sabores Caseros
            </h1>
          </div>

          <div style="padding:40px 30px;text-align:center;">
            <h2 style="
              margin:0 0 16px;
              color:#18181b;
            ">
              ¡Hola, ${name}!
            </h2>

            <p style="
              margin:0;
              color:#52525b;
              line-height:1.7;
            ">
              Tu cuenta ha sido creada exitosamente.
              Ya puedes explorar recetas y guardar tus favoritas.
            </p>
          </div>

          <div style="
            background:#fafafa;
            padding:16px;
            text-align:center;
            font-size:12px;
            color:#71717a;
          ">
            Gracias por unirte a nuestra comunidad.
          </div>

        </div>
      </div>
    `,
    });
  }
}
