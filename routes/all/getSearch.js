const getSearch = async (fastify) => {
  fastify.get("/api/search", async (request, reply) => {
    let { q } = request.query;
    const req = await fetch(`https://api.consumet.org/movies/flixhq/${q}`);
    const res = await req.json();
    return { result: res };
  });
};

module.exports = getSearch;
