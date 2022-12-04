require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genres, Videogame } = require("../db");


//-------------------------------------------->  PEDIDO A LA API DE TODOS LOS VIDEOGAMES (100)

const GetApiInfo = async () => {
    console.log(API_KEY)
    let videojuegos = []
    try {
        for (let i = 0; i < 5; i++) { //con un for recorro mi API, ya que es un arreglo, 5 veces
            const respuesta = await axios({
                method: 'get',
                url: `https://api.rawg.io/api/games?key=${API_KEY}`,
                headers: { "Accept-Encoding": "null" }
            }) //realizo la peticion
            //en mi .data podemos encontrar dos propiedades, results que es es aquello que voy a mapear
            respuesta.data.results?.map(v => { //a la respuesta/resultado lo mapeo
                videojuegos.push({ //y pusheo en mi array vacio todo aquello que mapee
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    rating: v.rating,
                    platforms: v.platforms?.map(el => el.platform.name),
                    genres: v.genres?.map(el => el.name)
                })
            });
            //y next que es donde voy a entrar para pasar a la siguente pagina.
            url = respuesta.data.next
        }
        return videojuegos

    } catch (error) {
        console.error(error);
        return ("sin datos")
    };
}

//-------------------------------------------->  PEDIDO A LA DATABASE  
const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

}


//--------------------------------------------> UNO LOS DOS PEDIDOS Y SE CONCATENAN EN UNO SOLO
const getAllInfo = async () => {
    const ApiInfo = await GetApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = ApiInfo.concat(DbInfo);
    return infoTotal
}

//--------------------------------------------> SOLICITUD POR QUERY DE NOMBRE A LA API
const nameApi = async (name) => {
    const infoSearch =
        await axios({
            method: 'get',
            url: `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`,
            headers: { "Accept-Encoding": "null" }
        })
    console.log(infoSearch)

    try {
        const vgSearch = await infoSearch.data.results?.map(el => {
            return {
                id: el.id,
                name: el.name,
                //released: el.released,
                image: el.background_image,
                rating: el.rating,
                platforms: el.platforms?.map(el => el.platform.name),
                genres: el.genres?.map(el => el.name)
            }
        })
        return vgSearch;
    } catch (e) {
        console.error(e)
    }
}

//--------------------------------------------> SOLICITUD POR QUERY DE NOMBRE DATABASE

const nameDb = async (name) => {
    try{
        const infodb = await getDbInfo();
        const infobyname = infodb.filter(videogame => videogame.name.includes(name))
        return infobyname;
    } catch (e) {
    console.error(e)
    }
}


//--------------------------------------------> uno mis solicitudes por QUERY

const GetAllInfoByName = async (name) => {
  
    const apInfo = await nameApi(name);
    const DbInfo = await nameDb(name);
    const infoTotal = apInfo.concat(DbInfo);
    return infoTotal
    
}


//--------------------------------------------> a API
const idApi = async (id) => {
    try {
        const rtaApi = await axios({
            url: `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
            method: 'get',
            headers: { "Accept-Encoding": "null" }
        })
            const { data } = await rtaApi;
            console.log(data + "esta es mi data")
            const info = {
                id: data.id,
                name: data.name,
                image: data.background_image,
                genres: data.genres?.map(g => g.name),
                description: data.description,
                released: data.released,
                rating: data.rating,
                platforms: data.platforms?.map(el => el.platform.name)
            }
            return info
    

    } catch (e) {
        console.error(e)
    }
}

//--------------------------------------------> a DATABASE
const idDb = async (id) => {
    try {
        return await Videogame.findByPk(id, {
            include: [{
                model: Genres,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
    } catch (e) {
        console.error(e)
    }
}

//--------------------------------------------> UNO LAS SOLICITUDES

const videogame = async (id) => {
  
    const infoIdDB = await idDb(id);
    if (infoIdDB){
        return infoIdDB
    }
    const infoIdApi= await idApi(id);
    return infoIdApi
  
}

module.exports = {
    getAllInfo,
    getDbInfo,
    GetApiInfo,
    nameApi,
    videogame,
    GetAllInfoByName 

}