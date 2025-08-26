import type { MongoClient } from "mongodb";
import { User } from "../module/users/models/User";
import { Collections } from "./types/Collections";
import { TransactionGroup } from "../module/transaction/models/TransactionGroup";
import {
  TransactionCategory,
  TransactionCategoryCustom,
} from "../module/transaction/models/TransactionCategory";

export default function useMongoCollections(
  mongoClient: MongoClient
): Collections {
  const db = mongoClient.db("fairshare");

  return {
    users: db.collection<User>("users"),
    transactions: {
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
  };
}
