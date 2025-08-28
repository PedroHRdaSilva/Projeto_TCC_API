import type { DefaultFieldsWithDeleted } from "~/utils/CommonTypes";
import type { ObjectId } from "mongodb";

export type CreditCard = DefaultFieldsWithDeleted & {
  transactionGroupId: ObjectId;
  description: string;
};
