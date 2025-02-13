const Movie = require('./models/Movie');

const resolvers = {
  Query: {
    // Get all movies
    getAllMovies: async () => {
      try {
        const movies = await Movie.find(); // Fetch all movies from the database
        return movies;
      } catch (error) {
        throw new Error("Failed to fetch movies");
      }
    },
    // Get a movie by ID
    getMovieById: async (_, { id }) => {
      try {
        const movie = await Movie.findById(id); // Fetch movie by ID
        if (!movie) throw new Error("Movie not found");
        return movie;
      } catch (error) {
        throw new Error("Failed to fetch movie");
      }
    },
  },
  Mutation: {
    // Add a new movie
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new Movie({
          name,
          director_name,
          production_house,
          release_date,
          rating,
        });
        await newMovie.save(); // Save the new movie to the database
        return newMovie;
      } catch (error) {
        throw new Error("Failed to add movie");
      }
    },
    // Update an existing movie
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const movie = await Movie.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true } // Return the updated movie
        );
        if (!movie) throw new Error("Movie not found");
        return movie;
      } catch (error) {
        throw new Error("Failed to update movie");
      }
    },
    // Delete a movie by ID
    deleteMovie: async (_, { id }) => {
      try {
        const movie = await Movie.findByIdAndDelete(id); // Delete movie by ID
        if (!movie) throw new Error("Movie not found");
        return `Movie with ID ${id} deleted`;
      } catch (error) {
        throw new Error("Failed to delete movie");
      }
    },
  },
};

module.exports = { resolvers };
