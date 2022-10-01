import { ApolloServer } from "apollo-server-cloudflare";
import { graphqlCloudflare } from "apollo-server-cloudflare/src/cloudflareApollo";

import typeDefs from '../schema.graphql';
import resolvers from '../resolvers';
import kvCache from '../kv-cache';

export interface CorsOptions {
  allowCredentials?: string | undefined;
  allowHeaders?: string | undefined;
  allowOrigin?: string | undefined;
  allowMethods?: string | undefined;
}

export interface GraphQLOptions {
  // Set the path for the GraphQL server
  baseEndpoint: string;

  // Set the path for the GraphQL playground
  // This option can be removed to disable the playground route
  playgroundEndpoint?: string;

  // When a request's path isn't matched, forward it to the origin
  forwardUnmatchedRequestsToOrigin?: boolean,

  // Enable debug mode to return script errors directly in browser
  debug?: boolean;

  // Enable CORS headers on GraphQL requests
  // Set to `true` for defaults (see `utils/setCors`),
  // or pass an object to configure each header
  // cors: {
  //   allowCredentials: 'true',
  //   allowHeaders: 'Content-type',
  //   allowOrigin: '*',
  //   allowMethods: 'GET, POST, PUT',
  // },
  cors?: CorsOptions;

  // Enable KV caching for external REST data source requests
  // Note that you'll need to add a KV namespace called
  // WORKERS_GRAPHQL_CACHE in your wrangler.toml file for this to
  // work! See the project README for more information.
  kvCache?: boolean;
}

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
