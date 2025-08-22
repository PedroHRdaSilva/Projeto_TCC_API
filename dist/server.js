"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToMongo_1 = __importDefault(require("./infra/connectToMongo"));
const logger_1 = __importDefault(require("./infra/logging/logger"));
const app = (0, express_1.default)();
async function startServer() {
    try {
        const client = await (0, connectToMongo_1.default)();
        await client.connect();
        const db = client.db(process.env.MONGO_DBNAME || "fairshare");
        logger_1.default.debug("✅ Conectado ao MongoDB no database:", db.databaseName);
        // Apenas para validar: listar coleções
        const collections = await db.listCollections().toArray();
        logger_1.default.debug("Coleções encontradas:", collections.map((c) => c.name));
        // Inicializa servidor HTTP
        const port = Number(process.env.SERVER_PORT) || 3001;
        app.listen(port, () => {
            logger_1.default.debug(`🚀 Server ready at http://localhost:${port}`);
        });
    }
    catch (err) {
        logger_1.default.error("❌ Erro ao iniciar servidor", { err });
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map