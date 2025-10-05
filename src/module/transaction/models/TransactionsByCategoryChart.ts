import type { ObjectId, Transaction } from "mongodb";

export type TransactionsByCategoryChart = {
  reportDate: Date;
  amount: number;
  categoryId: ObjectId;
  transactions: (Transaction & {
    categoryType: string;
  })[];
};
