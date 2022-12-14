const cheerio = require('cheerio')

const getLatestMovies = async (fastify) => {
    fastify.get('/api/movies/latest', async (request, reply) => {
        const req = await fetch('https://flixhq.to/home')
        const res = await req.text()
        const $ = cheerio.load(res)
        let data = []
        $('#main-wrapper > div > section:nth-child(6) > div.block_area-content.block_area-list.film_list.film_list-grid > div').find('div.flw-item').map((index, item) => {
            let movie_name = $(item).find('div.film-detail > h3 > a').text()
            let movie_id = $(item).find('div.film-detail > h3 > a').attr('href').replace('/', '')
            let movie_poster = $(item).find('div.film-poster > img').attr('data-src')
            let rls_year = $(item).find('div.film-detail > div.fd-infor > span:nth-child(1)').text()
            let movie_run_time = $(item).find('span.fdi-item.fdi-duration').text()
            let type = $(item).find('div.film-detail > div.fd-infor > span.float-right.fdi-type').text()
            let quality = $(item).find('div.film-poster > div.pick.film-poster-quality').text()
            data.push({
                movie_name,
                movie_id,
                movie_poster,
                rls_year,
                movie_run_time,
                type,
                quality
            })
        })
      return { result: data }
    })
}

module.exports = getLatestMovies