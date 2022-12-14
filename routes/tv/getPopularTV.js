const cheerio = require("cheerio");

const getPopularTV = async (fastify) => {
  fastify.get("/api/tv/popular", async (request, reply) => {
    let { page } = request.query;
    if (!page) {
      page = 1;
    }
    const req = await fetch(`https://flixhq.to/tv-show?page=${page}`);
    const res = await req.text();
    const $ = cheerio.load(res);
    let data = [];
    $(
      "#main-wrapper > div > section > div.block_area-content.block_area-list.film_list.film_list-grid > div"
    )
      .find("div.flw-item")
      .map((index, item) => {
        let tv_name = $(item).find("div.film-detail > h2 > a").text();
        let tv_id = $(item)
          .find("div.film-detail > h3 > a")
          .attr("href")
          .replace("/", "");
        let tv_poster = $(item).find("div.film-poster > img").attr("data-src");
        let season_num = $(item)
          .find("div.film-detail > div.fd-infor > span:nth-child(1)")
          .text();
        let episode_num = $(item)
          .find("div.film-detail > div.fd-infor > span:nth-child(3)")
          .text();
        // let movie_run_time = $(item).find('span.fdi-item.fdi-duration').text()
        let type = $(item)
          .find("div.film-detail > div.fd-infor > span.float-right.fdi-type")
          .text();
        let quality = $(item)
          .find("div.film-poster > div.pick.film-poster-quality")
          .text();
        data.push({
          tv_name,
          tv_id,
          tv_poster,
          season_num,
          episode_num,
          type,
          quality,
        });
      });
    return { result: data };
  });
};

module.exports = getPopularTV;
