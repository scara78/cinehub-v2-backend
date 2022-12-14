// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true, ignoreTrailingSlash: true });
const cheerio = require("cheerio");

fastify.get("/api", async (request, reply) => {
  return {
    info: "Welcome to Cinehub v2 API.",
    endpoints: {
      all: [
        {
          upcoming: "/api/upcoming",
        },
      ],
      movies: [
        {
          latest: "/api/movies/latest",
          popular: "/api/movies/popular?page=",
          top_imdb: "/api/movies/top-imdb?page=",
          trending: "/api/movies/trending",
        },
      ],
      tv: [
        {
          latest: "/api/tv/latest",
          popular: "/api/tv/popular?page=",
          top_imdb: "/api/tv/top-imdb?page=",
          trending: "/api/tv/trending",
        },
      ],
    },
  };
});

fastify.get("/*", async (request, reply) => {
  return { error: "Undefined Endpoint" };
});

// Declare Movie routes
const getTrendingMovies = require("./routes/movies/getTrendingMovies");
const getLatestMovies = require("./routes/movies/getLatestMovies");
const getPopularMovies = require("./routes/movies/getPopularMovies");
const getTopIMDBMovie = require("./routes/movies/getTopIMDBMovie");

// Declare TV routes
const getTrendingTV = require("./routes/tv/getTrendingTV");
const getLatestTV = require("./routes/tv/getLatestTV");
const getPopularTV = require("./routes/tv/getPopularTV");
const getTopIMDBTV = require("./routes/tv/getTopIMDBTV");

const getUpcoming = require("./routes/all/getUpcoming");

// Register Movie routes
fastify.register(getTrendingMovies);
fastify.register(getLatestMovies);
fastify.register(getPopularMovies);
fastify.register(getTopIMDBMovie);

// Register TV routes
fastify.register(getTrendingTV);
fastify.register(getLatestTV);
fastify.register(getPopularTV);
fastify.register(getTopIMDBTV);

fastify.register(getUpcoming);

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
