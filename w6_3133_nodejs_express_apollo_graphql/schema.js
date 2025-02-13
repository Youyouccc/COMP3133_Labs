const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Movie {
        id: ID!
        title: String!
        director: String!
        year: Int!
    }
    
    type Query {
        movies: [Movie]
        movie(id: ID!): Movie
    }

    type Mutation {
        addMovie(title: String!, director: String!, year: Int!): Movie
        updateMovie(id: ID!, title: String!, director: String!, year: Int): Movie
        deleteMovie(id: ID!): String
    }

`;
module.exports = typeDefs;