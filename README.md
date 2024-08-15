# 👷 `worker-apollo-server-template` Quick start

A template for kick starting a Cloudflare Workers project to deploy Apollo Server v4.

Live demo: https://worker-apollo-server.phelab.workers.dev

## Features

- [@as-integrations/cloudflare-workers](https://www.npmjs.com/package/@as-integrations/cloudflare-workers) integrated
- [@apollo/datasource-rest](https://www.npmjs.com/package/@apollo/datasource-rest) integrated
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) integrated
- [ESModule syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) + TypeScript
- Auto-deploy to Cloudflare Workers with GitHub Actions
- Auto-update dependencies with RenovateBot

## Usage

- Click on the button `Use this template`
- Install npm dependencies:

```bash
npm install
```

- Start app in the dev mode:

```bash
npm run dev
```

- If you edit the GraphQL schema in `src/schema.ts` file, you must re-generate the type definitions with the following command:

```bash
npm run generate
```

- Run tests:

```bash
npm run test
```
