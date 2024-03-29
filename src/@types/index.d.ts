import type PokemonAPI from '../datasources/pokemon-api';

export {};

declare global {
  type DataSources = { pokemonAPI: PokemonAPI };
  type Context = { dataSources: DataSources };
}
