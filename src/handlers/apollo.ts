import { ApolloServer } from "apollo-server-cloudflare";
import { graphqlCloudflare } from "apollo-server-cloudflare/src/cloudflareApollo";

import typeDefs from '../schema.graphql';
import resolvers from '../resolvers';
import kvCache from '../kv-cache';

export const apolloHandler = async (request: Request, options: GraphQLOptions) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    introspection: Boolean(options.playgroundEndpoint),
    ...(options.kvCache ? kvCache : {}),
  });

  await server.start();

  return graphqlCloudflare(
    () => server.createGraphQLServerOptions(request)
  )(request);
}
