# 👷 `worker-apollo-server` Quick start

A template for kick starting a Cloudflare worker project to deploy Apollo GraphQL Server to Cloudflare Worker.

[`index.ts`](blob/main/src/index.ts) is the content of the Workers script.

- [`handlers/apollo.ts`](blob/main/src/handlers/apollo.ts): Route handler for GraphQL query request
- [`handlers/playground.ts`](blob/main/src/handlers/playground.ts): Route handler for GraphQL Playground

## Usage

Click [Use this template](https://github.com/kimyvgy/worker-apollo-server/generate) button to create your own repository.

This template uses `graphql-codegen` to auto-generate Typescript types from `schema.graphql`. The types are generated to file `src/@types/schema.generated.ts`. So you can import Resolver Types from there.

Enjoin!

## Examples

Live: https://worker-apollo-server.webee-asia.workers.dev/playground

```graphql
query Example($id: ID!) {
  example
  pokemon(id: $id) {
    id
  }
}
```

Response:

```json
{
  "data": {
    "example": "Hello world!",
    "pokemon": {
      "id": "1"
    }
  }
}
```

## Development

Start your dev server with following commands:

```sh
yarn install
yarn dev
```

Open up [http://0.0.0.0:8787](http://0.0.0.0:8787) and you should be ready to go!

## Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
yarn deploy
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
  - GRAPHQL_PLAYGROUND_ENDPOINT: "/playground"
  - GRAPHQL_KV_CACHE: "true"
Total Upload: 1520.16 KiB / gzip: 285.68 KiB
Uploaded worker-apollo-server (2.71 sec)
Published worker-apollo-server (0.28 sec)
  https://worker-apollo-server.webee-asia.workers.dev
Done in 7.29s.
```
