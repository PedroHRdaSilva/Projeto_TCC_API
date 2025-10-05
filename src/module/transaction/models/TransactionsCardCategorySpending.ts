import type { ObjectId, Transaction } from "mongodb";

export type TransactionsCardCategorySpending = {
  reportDate: Date;
  amount: number;
  categoryId: ObjectId;
  creditCardId: ObjectId;
  transactions: (Transaction & {
    categoryType: string;
  })[];
};
