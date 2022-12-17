import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { RESTDataSource } from '@apollo/datasource-rest';

class PokemonAPI extends RESTDataSource {
  override baseURL = 'https://pokeapi.co/api/v2/';

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  getPokemon(id: string): Promise<any> {
    return this.get(`pokemon/${id}`);
  }
}

export default PokemonAPI;
