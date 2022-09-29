export {};

declare global {
  // Declare types for the bindings: KV Namespace, Environment variables... here
  const GRAPHQL_CACHE: KVNamespace;

  // Environment variables
  const GRAPHQL_BASE_ENDPOINT: string;
  const GRAPHQL_PLAYGROUND_ENDPOINT: string;
  const GRAPHQL_KV_CACHE: string;
}
