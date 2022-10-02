import { Resolvers } from "./@types/schema.generated";

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    example: () => {
      return 'Hello world!';
    },

    pokemon: (_source, { id }, { dataSources }) => {
      return dataSources.pokemonAPI.getPokemon(id);
    },
  }
}

export default resolvers;
