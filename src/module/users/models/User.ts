import type { DefaultFields } from "~/utils/CommonTypes";

export type User = DefaultFields & {
  email: string;
  name: string;
  password: string;
  passwordResetToken: string | null;
  passwordResetExpiress: Date | null;
  photo?: string | null;
};
