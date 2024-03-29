# 👷 `worker-apollo-server-template` Quick start

A template for kick starting a Cloudflare Workers project to deploy Apollo Server v4.

- Cloudflare Workers - ESModule syntax + TypeScript
- [@as-integrations/cloudflare-workers](https://www.npmjs.com/package/@as-integrations/cloudflare-workers)
- [@apollo/datasource-rest](https://www.npmjs.com/package/@apollo/datasource-rest) integrated
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) integrated

Live demo: https://worker-apollo-server.ds101.workers.dev

## Usage

- Click on the button `Use this template`
- Install npm dependencies

```bash
npm install
```

- Start app in the dev mode

```bash
npm run dev
```

- If you edit the `src/schema.graphql`, you must re-generate the schema type definitions:

```bash
npm run generate
```

- Run tests:

```bash
npm run test
```
