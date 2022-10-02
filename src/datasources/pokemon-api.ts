import { RESTDataSource } from 'apollo-datasource-rest';

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  public getPokemon(id: string) {
    return this.get(`pokemon/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    })
  }
}

export default PokemonAPI;
