// FUTURE REFACTOR
import { MongoClient } from "mongodb";
import { URL } from "url";
import logger from "~/infra/logging/logger";

export default async function connectToMongo(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Missing `MONGO_URI` environment variable. Aren't you missing a .env file and is it up to date?"
    );
  }

  const mongoURL = new URL(process.env.MONGODB_URI);
  logger.debug("Connecting to MongoDB", {
    host: mongoURL.host,
    port: mongoURL.port || null,
    database: mongoURL.pathname.substr(1) || process.env.MONGO_DBNAME || null,
    username: mongoURL.username || null,
    options: Object.fromEntries(mongoURL.searchParams),
  });

  const client = new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 100,
    minPoolSize: 10,
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
  });

  client.on("error", (err) => {
    logger.error("MongoDB connection error", {
      err,
    });
  });
  client.on("connected", () => {
    logger.debug("Connection to MongoDB established");
  });
  client.once("open", () => {
    logger.debug("MongoDB connection opened");
  });
  client.on("reconnected", () => {
    logger.debug("Reconnecting to MongoDB");
  });
  client.on("disconnected", () => {
    logger.debug("MongoDB disconnected");
  });

  return client;
}
