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

  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
      },
    }
  );

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Suporte CashTrack" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Recuperar senha",
    text: `Clique no link para redefinir sua senha: ${resetUrl}`,
    html: `<p>Clique no link para redefinir sua senha:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });

  return true;
}
