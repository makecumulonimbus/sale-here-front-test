import { GraphQLServer, PubSub } from "graphql-yoga";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
