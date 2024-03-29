import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Worker', () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev('src/index.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('should return the text "Hello universe!"', async () => {
    const resp = await worker.fetch('/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query Query {\n  example\n}',
        variables: {},
        operationName: 'Query',
      }),
    });
    const json = await resp.json();
    expect(resp.status).toBe(200);
    expect(json).toEqual({
      data: {
        example: 'Hello universe!',
      },
    });
  });

  it('should return the Pokemon ID "1"', async () => {
    const resp = await worker.fetch('/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query Pokemon($pokemonId: ID!) {\n  pokemon(id: $pokemonId) {\n    id\n  }\n}',
        variables: {
          pokemonId: 1,
        },
        operationName: 'Pokemon',
      }),
    });
    const json = await resp.json();
    expect(resp.status).toBe(200);
    expect(json).toEqual({
      data: {
        pokemon: {
          id: '1',
        },
      },
    });
  });
});
