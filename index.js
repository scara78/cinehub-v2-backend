// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true, ignoreTrailingSlash: true });
const cors = require('@fastify/cors')
const cheerio = require("cheerio");

fastify.get("/api", async (request, reply) => {
  return {
    info: "Welcome to Cinehub v2 API.",
    endpoints: {
      all: [
        {
          upcoming: "/api/upcoming",
          info: "/api/info?id=",
          stream_links: "/api/watch?id=&epid=",
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

// Declare Misc routes
const getUpcoming = require("./routes/all/getUpcoming");
const getInfo = require("./routes/all/getInfo");
const getStreamLinks = require("./routes/all/getStreamLinks");

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

// Register Misc routes
fastify.register(getUpcoming);
fastify.register(getInfo);
fastify.register(getStreamLinks);

fastify.regiser(cors, { 
  origin: "*",
  methods: ["GET"]
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
