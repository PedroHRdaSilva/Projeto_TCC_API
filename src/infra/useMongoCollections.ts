import type { MongoClient } from "mongodb";
import { User } from "../module/users/models/User";
import { Collections } from "./types/Collections";

export default function useMongoCollections(
  mongoClient: MongoClient
): Collections {
  const db = mongoClient.db("fairshare");

  return {
    users: db.collection<User>("users"),
  };
}
