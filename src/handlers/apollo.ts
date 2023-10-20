import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler, CloudflareWorkersHandler } from '@as-integrations/cloudflare-workers'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import typeDefs from '~/schema.graphql';
import resolvers from '~/resolvers';
import PokemonAPI from "~/datasources/pokemon-api";
import { KVCache } from '~/kv-cache';

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

export const createGraphQLHandler = (options: GraphQLOptions): CloudflareWorkersHandler => {
  return startServerAndCreateCloudflareWorkersHandler(server, {
    context: async ({ request }: any) => {
      const cache = options.kvCache ? new KVCache() : server.cache;

        const dataSources: ApolloDataSources = {
          pokemonAPI: new PokemonAPI({ cache, fetch: fetch.bind(globalThis) }),
        };

        return { dataSources };
    },
  });
}
