"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectToMongo;
// FUTURE REFACTOR
const mongodb_1 = require("mongodb");
const url_1 = require("url");
const logger_1 = __importDefault(require("./logging/logger"));
async function connectToMongo() {
    if (!process.env.MONGODB_URI) {
        throw new Error("Missing `MONGO_URI` environment variable. Aren't you missing a .env file and is it up to date?");
    }
    const mongoURL = new url_1.URL(process.env.MONGODB_URI);
    logger_1.default.debug("Connecting to MongoDB", {
        host: mongoURL.host,
        port: mongoURL.port || null,
        database: mongoURL.pathname.substr(1) || process.env.MONGO_DBNAME || null,
        username: mongoURL.username || null,
        options: Object.fromEntries(mongoURL.searchParams),
    });
    const client = new mongodb_1.MongoClient(process.env.MONGODB_URI, {
        maxPoolSize: 100,
        minPoolSize: 10,
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 3000,
    });
    client.on("error", (err) => {
        logger_1.default.error("MongoDB connection error", {
            err,
        });
    });
    client.on("connected", () => {
        logger_1.default.debug("Connection to MongoDB established");
    });
    client.once("open", () => {
        logger_1.default.debug("MongoDB connection opened");
    });
    client.on("reconnected", () => {
        logger_1.default.debug("Reconnecting to MongoDB");
    });
    client.on("disconnected", () => {
        logger_1.default.debug("MongoDB disconnected");
    });
    return client;
}
//# sourceMappingURL=connectToMongo.js.map