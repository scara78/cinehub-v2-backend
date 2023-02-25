const getStreamLinks = async (fastify) => {
  fastify.get("/api/watch", async (request, reply) => {
    let { id, epid } = request.query;
    const req = await fetch(
      `https://c.delusionz.xyz/movies/flixhq/watch?mediaId=${id}&episodeId=${epid}`
    );
    const res = await req.json();
    return { result: res };
  });
};

module.exports = getStreamLinks;
