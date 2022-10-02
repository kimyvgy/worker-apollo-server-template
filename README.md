# 👷 `worker-apollo-server` Quick start

A template for kick starting a Cloudflare worker project.

[`index.ts`](https://github.com/kimyvgy/worker-apollo-server/blob/main/src/index.ts) is the content of the Workers script.

- [`handlers/apollo.ts`](https://github.com/kimyvgy/worker-apollo-server/blob/main/src/handlers/apollo.ts): Route handler for GraphQL query request
- [`handlers/playground.ts`](https://github.com/kimyvgy/worker-apollo-server/blob/main/src/handlers/playground.ts): Route handler for GraphQL Playground

## Usage

Click `Use Template` button to create your own repository.

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
