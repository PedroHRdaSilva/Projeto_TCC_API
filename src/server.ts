import express, { json } from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import schema from "~/graphql/schema";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import useMongoCollections from "~/infra/useMongoCollections";
import connectToMongo from "~/infra/connectToMongo";

const app = express();

async function startServer() {
  try {
    const client: MongoClient = await connectToMongo();
    await client.connect();
    const dbName = process.env.MONGO_DBNAME || "fairshare";
    const db = client.db(dbName);
    console.log(`✅ Conectado ao MongoDB no database: ${db.databaseName}`);

    app.use(cors());
    app.use(json());

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

    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const collections = useMongoCollections(client);

          const { viewer } = res.locals;
          return { db, collections, req, res, viewer };
        },
      })
    );

    const port = Number(process.env.SERVER_PORT) || 3001;
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

startServer();
