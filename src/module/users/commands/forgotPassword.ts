import { UserNotFoundError } from "~/infra/GraphQLErrors";
import { Collections } from "~/infra/types/Collections";
import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function forgotPassword(
  collections: Collections,
  email: string
) {
  const user = await collections.users.findOne({ email });
  if (!user) {
    throw new UserNotFoundError();
  }

  const token = crypto.randomBytes(32).toString("hex");

  const experiedDate = new Date(Date.now() + 6 * 60 * 60 * 1000);

  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetToken: token,
        passwordResetExpiress: experiedDate,
      },
    }
  );

  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  const expiredDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(Date.now() + 1000 * 60 * 60));
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

  return true;
}
