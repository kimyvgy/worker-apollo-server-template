import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareHandler, KVCache, GraphQLRequestHandler } from 'apollo-server-integration-cloudflare-workers';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import typeDefs from '~/schema.graphql';
import resolvers from '~/resolvers';
import PokemonAPI from "~/datasources/pokemon-api";

interface ContextValue {
  dataSources: ApolloDataSources;
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    // ApolloServerPluginLandingPageProductionDefault({
    //   graphRef: 'my-graph-id@my-graph-variant',
    //   footer: false,
    // })
  ],
});

export const createGraphQLHandler = (options: GraphQLOptions): GraphQLRequestHandler => {
  return startServerAndCreateCloudflareHandler(server, {
    cors: options.cors,
    context: async () => {
      const cache = options.kvCache ? new KVCache() : server.cache;

      const dataSources: ApolloDataSources = {
        pokemonAPI: new PokemonAPI({ cache }),
      };

      return { dataSources };
    }
  });
}
