import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import schema from "~/graphql/schema";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import useMongoCollections from "~/infra/useMongoCollections";
import connectToMongo from "~/infra/connectToMongo";
import jwt from "jsonwebtoken";

const app = express();

async function startServer() {
  try {
    const client: MongoClient = await connectToMongo();
    await client.connect();
    const dbName = process.env.MONGO_DBNAME || "cashtrack";
    const db = client.db(dbName);
    console.log(`✅ Conectado ao MongoDB no database: ${db.databaseName}`);

    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    app.use(json()); // express.json() pode ficar aqui

    // 🟢 Middleware de autenticação
    app.use(async (req, res, next) => {
      let token = req.headers.authorization?.replace("Bearer ", "");

      if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
      }

      if (token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
          ) as {
            userId: string;
            iat: number;
            exp: number;
          };

          const collections = useMongoCollections(client);
          const user = await collections.users.findOne({
            _id: new ObjectId(decoded.userId),
          });

          if (user) {
            res.locals.viewer = user;
          }
        } catch (err) {
          console.error("JWT inválido:", err);
        }
      }

      next();
    });

    const shouldRunSandbox = process.env.NODE_ENV === "development";

    const server = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        shouldRunSandbox
          ? ApolloServerPluginLandingPageLocalDefault()
          : ApolloServerPluginLandingPageDisabled(),
      ],
    });

    await server.start();

    // 🟢 ExpressMiddleware do Apollo
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const collections = useMongoCollections(client);
          const viewer = (res as any).locals.viewer; // garante que o viewer exista
          return { db, collections, req, res, viewer };
        },
      })
    );

    const port = process.env.PORT || 3001;

    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

startServer();
