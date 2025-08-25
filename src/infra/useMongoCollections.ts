import type { MongoClient } from "mongodb";
import { User } from "../module/users/models/User";
import { Collections } from "./types/Collections";
import { Transaction } from "../module/transaction/models/TransactionGroup";

export default function useMongoCollections(
  mongoClient: MongoClient
): Collections {
  const db = mongoClient.db("fairshare");

  return {
    users: db.collection<User>("users"),
    transaction: db.collection<Transaction>("transaction"),
  };
}
