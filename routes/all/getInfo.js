const getInfo = async (fastify) => {
  fastify.get("/api/info", async (request, reply) => {
    let { id } = request.query;
    const req = await fetch(
      `https://api.consumet.org/movies/flixhq/info?id=${id}`
    );
    const res = await req.json();
    return { result: res };
  });
};

module.exports = getInfo;
