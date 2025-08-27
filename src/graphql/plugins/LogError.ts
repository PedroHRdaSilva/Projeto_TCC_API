import type { ApolloServerPlugin } from "@apollo/server";
import logger from "~/infra/logging/logger";

const LogErrors: ApolloServerPlugin = {
  async requestDidStart(ctx) {
    return {
      async didEncounterErrors() {
        if (!ctx.errors || ctx.errors.length === 0) {
          return;
        }

        logger.error("GraphQL error");
        ctx.errors.forEach((err) => logger.error(JSON.stringify(err, null, 2)));
      },

      async parsingDidStart() {
        return async (err) => {
          if (err) {
            logger.error("GraphQL parsing error");
            logger.error(JSON.stringify(err, null, 2));
          }
        };
      },

      async validationDidStart() {
        return async (errs) => {
          if (errs && errs.length > 0) {
            errs.forEach((err) => {
              logger.error("GraphQL validation error");
              logger.error(JSON.stringify(err, null, 2));
            });
          }
        };
      },

      async executionDidStart() {
        return {
          async executionDidEnd(err) {
            if (err) {
              logger.error("GraphQL execution error");
              logger.error(JSON.stringify(err, null, 2));
            }
          },
        };
      },
    };
  },
};

export default LogErrors;
