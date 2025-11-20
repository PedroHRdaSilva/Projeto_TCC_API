import { UserNotFoundError } from "~/infra/GraphQLErrors";
import { Collections } from "~/infra/types/Collections";
import crypto from "crypto";
import { Resend } from "resend";

export default async function forgotPassword(
  collections: Collections,
  email: string
) {
  console.log("🔍 Buscando usuário...");
  const user = await collections.users.findOne({ email });
  if (!user) throw new UserNotFoundError();

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

  const resetUrl = `https://projeto-tcc-web.vercel.app/reset-password/${token}`;
  const expiredDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(experiedDate);

  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log("📤 Enviando e-mail via Resend...");

  await resend.emails.send({
    from: "Suporte CashTrack <onboarding@resend.dev>",
    to: email,
    subject: "Recuperar senha",
    html: `
      <p>Clique no link para redefinir sua senha:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>⚠️ Este link é válido até ${expiredDateFormatted}.</p>
    `,
  });

  console.log("✅ E-mail enviado com sucesso!");
  return true;
}
