const { default: axios } = require('axios');
const { Router } = require('express');
const { Genre } = require('../db.js')
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const respuesta = await axios({
            url: `https://api.rawg.io/api/genres?key=${API_KEY}`,
            method: 'get',
            headers: { "Accept-Encoding": "null" }
        })
        const genresApi = await respuesta.data.results?.map(g => g.name)
        res.json(genresApi);
    } catch (e) {
        next(e);
    }

})
//console.log('estos son los generos: ', genresApi)


router.post('/', async (req, res, next) => {
    const { name } = req.body;
    try {
        const newGenre = await Genre.Create({ //lo uso para guardar los generos que me traje de la API en la base de datos
            name
        });
        res.status(201).json(newGenre);

    } catch (e) {
        next(e);
    }

})

module.exports = router;