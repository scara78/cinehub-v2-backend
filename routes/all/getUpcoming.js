const cheerio = require('cheerio')

const getUpcoming = async (fastify) => {
    fastify.get('/api/upcoming', async (request, reply) => {
        const req = await fetch('https://flixhq.to/home')
        const res = await req.text()
        const $ = cheerio.load(res)
        let data = []
        $('#main-wrapper > div > section:nth-child(8) > div.block_area-content.block_area-list.film_list.film_list-grid > div').find('div.flw-item').map((index, item) => {
            let name = $(item).find('div.film-detail > h3 > a').text()
            let id = $(item).find('div.film-detail > h3 > a').attr('href')
            let poster = $(item).find('div.film-poster > img').attr('data-src')
            let rls_year = $(item).find('div.film-detail > div.fd-infor > span:nth-child(1)').text()
            // let runtime = $(item).find('span.fdi-item.fdi-duration').text()
            let type = $(item).find('div.film-detail > div.fd-infor > span.float-right.fdi-type').text()
            let quality = $(item).find('div.film-poster > div.pick.film-poster-quality').text()
            data.push({
                name,
                id,
                poster,
                rls_year,
                type,
                quality
            })
        })
      return { result: data }
    })
}

module.exports = getUpcoming