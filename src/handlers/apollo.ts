import { ApolloServer } from "apollo-server-cloudflare";
import { graphqlCloudflare } from "apollo-server-cloudflare/src/cloudflareApollo";

import typeDefs from '../schema.graphql';
import resolvers from '../resolvers';
import KVCache from '../kv-cache';
import PokemonAPI from "~/datasources/pokemon-api";

const kvCache = { cache: new KVCache() };

const dataSources = (): ApolloDataSources => ({
  pokemonAPI: new PokemonAPI(),
});

export const apolloHandler = async (request: Request, options: GraphQLOptions) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    cache: 'bounded',
    introspection: Boolean(options.playgroundEndpoint),
    ...(options.kvCache ? kvCache : {}),
  });

  await server.start();

  return graphqlCloudflare(
    () => server.createGraphQLServerOptions(request)
  )(request);
}
