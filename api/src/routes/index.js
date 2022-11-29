const { Router } = require('express');
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogame', videogame)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//mi primera ruta es un get de todos los videogames para trabajar desde mi DB.


module.exports = router;
