import type { MongoClient } from "mongodb";
import { User } from "../module/users/models/User";
import { Collections } from "./types/Collections";
import { TransactionGroup } from "../module/transaction/models/TransactionGroup";
import {
  TransactionCategory,
  TransactionCategoryCustom,
} from "../module/transaction/models/TransactionCategory";
import { Transaction } from "~/module/transaction/models/Transaction";
import { CreditCard } from "~/module/transaction/models/CreditCard";

export default function useMongoCollections(
  mongoClient: MongoClient
): Collections {
  const db = mongoClient.db("fairshare");

  return {
    users: db.collection<User>("users"),
    transactions: {
      detail: db.collection<Transaction>("transaction.detail"),
      group: db.collection<TransactionGroup>("transactions.group"),
      categories: {
        defaults: db.collection<TransactionCategory>(
          "transactions.categories.defaults"
        ),
        custom: db.collection<TransactionCategoryCustom>(
          "transactions.categories.custom"
        ),
      },
    },
    creditCard: db.collection<CreditCard>("creditCard"),
  };
}
