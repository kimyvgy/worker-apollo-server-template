import { apolloHandler, GraphQLOptions } from './handlers/apollo';
import playground from './handlers/playground';
import setCorsHeaders from './utils/cors';

const graphQLOptions: GraphQLOptions = {
  baseEndpoint: GRAPHQL_BASE_ENDPOINT,
  playgroundEndpoint: GRAPHQL_PLAYGROUND_ENDPOINT,
  kvCache: Boolean(GRAPHQL_KV_CACHE),
};

const handleApolloGraphQL = async (request: Request): Promise<Response> => {
  const response = request.method === 'OPTIONS'
    ? new Response('', { status: 204 })
    : await apolloHandler(request, graphQLOptions) as Response;

  if (graphQLOptions.cors) {
    setCorsHeaders(response, graphQLOptions.cors);
  }

  return response;
}

const handleRequest = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url)

  try {
    if (pathname === graphQLOptions.baseEndpoint) {
      return handleApolloGraphQL(request);
    }

    if (pathname === graphQLOptions?.playgroundEndpoint) {
      return playground(request, graphQLOptions.baseEndpoint);
    }

    return graphQLOptions?.forwardUnmatchedRequestsToOrigin
      ? fetch(request)
      : new Response('Not found', { status: 404 });
  } catch (err: any) {
    return new Response(graphQLOptions?.debug ? err : 'Something went wrong', {
      status: 500,
    });
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
});
