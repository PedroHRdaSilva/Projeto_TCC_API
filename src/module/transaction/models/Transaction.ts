import type { ObjectId } from "mongodb";
import { ITransactionStatus } from "~/graphql/types/graphql";
import { DefaultFieldsWithDeleted } from "~/utils/CommonTypes";

export type Installments = {
  installmentsGroupId: ObjectId;
  total: number;
  current: number;
};

export type Transaction = DefaultFieldsWithDeleted & {
  transactionGroupId: ObjectId;
  categoryId: ObjectId;
  description: string;
  date: Date;
  amount: number;
  isRecurringPayment?: boolean;
  creditCardId?: ObjectId;
  installments?: Installments;
  status?: ITransactionStatus;
};
