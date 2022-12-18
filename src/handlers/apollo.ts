import type { Request, Response } from "@cloudflare/workers-types";

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareHandler, KVCache } from 'apollo-server-integration-cloudflare-workers';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import typeDefs from '~/schema.graphql';
import resolvers from '~/resolvers';
import PokemonAPI from "~/datasources/pokemon-api";

interface ContextValue {
  dataSources: ApolloDataSources;
};

export const apolloHandler = (request: Request, options: GraphQLOptions): Promise<Response> => {
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

  return startServerAndCreateCloudflareHandler(server, {
    request,
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
