const { Router } = require('express');
//const { axios } = require ('axios');
require('dotenv').config();
const { getDbInfo, GetApiInfo, nameApi, getAllInfo, GetAllInfoByName } = require('../controllers/videogames');
//const { Videogame } = require ("../db")

const router = Router();
//---------------> PEDIDO DE TODOS LOS VIDEGAMES
router.get('/', async (req, res, next) => {
	const { name } = req.query; //el nombre me llega por query
	let allVideogames = await getAllInfo()

	if (name) {
		try {
			const allResults = await GetAllInfoByName(name)
			// const gamesByNameDB = await getDbInfo()
			// let foundGamesDB = gamesByNameDB.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
			// let allResults = foundGamesDB.concat(foundGamesAPI)
			allResults.length ? res.status(200).json(allResults.slice(0, 15)) : res.status(400).json('No hay un videojuego con dicho nombre')

		} catch (err) {
			next(err)
		}
	}
	else {
		res.json(allVideogames)
		return
	}
})

router.get('/api', async (req, res, next) => {
	const { name } = req.query; //el nombre me llega por query
	let allVideogames = await GetApiInfo()
	try {
		res.status(200).json(allVideogames)

	}
	catch (err) {
		next(err)
	}
})

router.get('/db', async (req, res, next) => {
	const { name } = req.query; //el nombre me llega por query
	let allVideogames = await getDbInfo()
	try {
		res.status(200).json(allVideogames)

	}
	catch (err) {
		next(err)
	}
})

router.get('/platforms', async (req, res, next) => {

	try {
		const all = await GetApiInfo();
		const allPlatforms = [];
		all.map(g => g.platforms.map(p => {
			if (!allPlatforms.includes(p)) {
				allPlatforms.push(p)
			}
		}))

		allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).json('Error')

	} catch (e) {
		next(e)
	}
})




module.exports = router;