const typeDefs = `#graphql
type Query {
  example: String!
  pokemon(id: ID!): Pokemon
}

type PokemonSprites {
  front_default: String!
  front_shiny: String!
  front_female: String!
  front_shiny_female: String!
  back_default: String!
  back_shiny: String!
  back_female: String!
  back_shiny_female: String!
}

type Pokemon {
  id: ID!
  name: String!
  height: Int!
  weight: Int!
  sprites: PokemonSprites!
}
`;

export default typeDefs;
