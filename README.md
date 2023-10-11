# 👷 `worker-apollo-server-template` Quick start

A template for kick starting a Cloudflare worker project to deploy Apollo Server v4 to Cloudflare Workers.

[`index.ts`](blob/main/src/index.ts) is the content of the Workers script.

- [`handlers/apollo.ts`](blob/main/src/handlers/apollo.ts): Route handler for GraphQL query request
- [@as-integrations/cloudflare-workers](https://www.npmjs.com/package/@as-integrations/cloudflare-workers)
- Enable Playground / Sandbox by adding `plugins` + `introspection`:

```javascript
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
```

## Example

Live: https://worker-apollo-server.ds101.workers.dev

```graphql
query {
  example
  pokemon(id: 1) {
    id
    name
  }
}
```

Response:

```json
{
  "data": {
    "example": "Hello world!",
    "pokemon": {
      "id": "1",
      "name": "bulbasaur"
    }
  }
}
```

## Development

Click [Use this template](https://github.com/kimyvgy/worker-apollo-server/generate) button to create your own repository.

Start your dev server with following commands:

```sh
yarn install
yarn dev
```

Open up [http://0.0.0.0:8787](http://0.0.0.0:8787) and you should be ready to go!

> This template uses `graphql-codegen` to auto-generate Typescript types from `schema.graphql`. The types are generated to file `src/@types/schema.generated.ts`. So you can import Resolver Types from there.

## Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Please change the environment variables for Cloudflare Workers in `wrangler.toml` file:
```toml
# Example
[env.production]
name = "worker-apollo-server"
[[env.production.kv_namespaces]]
binding = "GRAPHQL_CACHE"
id = "ba46c41d96544abba4aae3600c4955eb"
[env.production.vars]
GRAPHQL_BASE_ENDPOINT = "/"
GRAPHQL_KV_CACHE = "true"
```

Once that's done, you should be able to deploy your app:

```sh
yarn deploy --env production
```

```bash
yarn run v1.22.19
$ wrangler publish
 ⛅️ wrangler 2.1.9
-------------------
Running custom build: npm run generate && npm run build

> generate
> graphql-codegen --config codegen.yml

✔ Parse Configuration
✔ Generate outputs

> build
> NODE_ENV=production node worker.build.js

Your worker has access to the following bindings:
- KV Namespaces:
  - GRAPHQL_CACHE: dbdc624f2c684f1bb88fa38ab249a13e
- Vars:
  - GRAPHQL_BASE_ENDPOINT: "/"
  - GRAPHQL_KV_CACHE: "true"
Total Upload: 1520.16 KiB / gzip: 285.68 KiB
Uploaded worker-apollo-server (2.71 sec)
Published worker-apollo-server (0.28 sec)
  https://worker-apollo-server.ds101.workers.dev
Done in 7.29s.
```
