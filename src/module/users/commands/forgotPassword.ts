import { UserNotFoundError } from "~/infra/GraphQLErrors";
import { Collections } from "~/infra/types/Collections";
import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function forgotPassword(
  collections: Collections,
  email: string
) {
  console.log("🔍 Buscando usuário...");
  const user = await collections.users.findOne({ email });

  if (!user) {
    console.log("❌ Usuário não encontrado:", email);
    throw new UserNotFoundError();
  }

  console.log("🔐 Gerando token de reset...");
  const token = crypto.randomBytes(32).toString("hex");

  const experiedDate = new Date(Date.now() + 6 * 60 * 60 * 1000);

  console.log("💾 Salvando token no banco...");
  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetToken: token,
        passwordResetExpiress: experiedDate,
      },
    }
  );

  const resetUrl = `https://projeto-tcc-web.vercel.app/reset-password/${token}`;
  console.log("🔗 URL de reset gerada:", resetUrl);

  console.log("📨 Criando transporter SMTP...");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  console.log("🧪 Verificando conexão com SMTP...");
  try {
    await transporter.verify();
    console.log("✅ SMTP verificado! Conexão ok.");
  } catch (err) {
    console.error("❌ Erro no SMTP verify:", err);
  }

  const expiredDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(Date.now() + 1000 * 60 * 60));

  console.log("📤 Enviando email para:", email);

  try {
    await transporter.sendMail({
      from: `"Suporte CashTrack" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Recuperar senha",
      text: `Clique no link para redefinir sua senha: ${resetUrl}`,
      html: `
        <p>Clique no link para redefinir sua senha:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>⚠️ Este link é válido até ${expiredDate}.</p>
      `,
    });

    console.log("✅ Email enviado com sucesso para:", email);
  } catch (err) {
    console.error("❌ Erro ao enviar email:", err);
  }

  return true;
}
