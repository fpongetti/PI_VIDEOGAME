
import { GET_VIDEOGAME, SORT_RATING, SORT, GET_VIDEOGAME_NAME, FILTER_DB, GET_GENRE, FILTER_GENRE, FILTER_PLATFORMS, GET_VIDEOGAMES_API, GET_VIDEOGAMES_DB } from '../actions/index';

let initalState = {
    videogames: [],
    videogameFilter: [],
    genres: [],
    videogame: {},
    error: false,
    complete: false
}

export default function rootReducer(state = initalState, action) {

    switch (action.type) {
        case GET_VIDEOGAME:
            // if(state.complete){
            //     return{...state,
            //         videogameFilter:state.videogame
            //     }
            // }
            // else{
            return {
                ...state,
                videogames: action.payload,
                videogameFilter: action.payload,
                error: false,
                complete: true
            }
        // }
        case GET_VIDEOGAMES_API:
            return {
                ...state,
                videogames: action.payload,
                videogameFilter: action.payload,
                error: false,
                complete: true
            }
            case GET_VIDEOGAMES_DB:
                return {
                    ...state,
                    videogames: action.payload,
                    videogameFilter: action.payload,
                    error: false,
                    complete: true
                }
        case GET_GENRE:
            return { ...state, genres: action.payload }
        case GET_VIDEOGAME_NAME:
            if (action.payload.length >= 1) {
                return {
                    ...state,
                    videogames: action.payload,
                    videogameFilter: action.payload,
                    error: false,
                    complete: false,
                }
            } else {
                return {
                    ...state,
                    videogames: action.payload,
                    videogameFilter: action.payload,
                    error: true,
                    complete: false,
                }
            }


        case SORT_RATING:
            let ordernamientoRT = action.payload === 'descendente' ?
                state.videogameFilter.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1
                    }
                    if (b.rating > a.rating) {
                        return -1
                    }
                    return 0
                }) : state.videogameFilter.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogameFilter: ordernamientoRT
            }

        case SORT:
            const ordernamientoVG = action.payload === 'atoz' ? state.videogameFilter.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                else return -1
            }) : state.videogameFilter.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                else return -1
            })
            return {
                ...state,
                videogameFilter: ordernamientoVG
            }

        case FILTER_DB:
            let filterDB = [...state.videogames];

            if (action.payload === 'DB') {
                filterDB = filterDB.filter((e) => {
                    return e.id.length > 8
                });

            } else {
                filterDB = filterDB.filter((e) => {
                    return typeof e.id !== 'string'
                });
            }

            if (filterDB.length >= 1) {
                return {
                    ...state,
                    videogameFilter: filterDB,
                    error: false
                }
            } else {
                return {
                    ...state,
                    videogameFilter: filterDB,
                    error: true,
                }

            }

        case FILTER_GENRE:
            const allGames = state.videogames
            const filterGenre = action.payload === 'all' ? allGames : allGames.filter(videogame => {
                if (videogame.genres.length > 0) {
                    if (videogame.genres.find(element => element === action.payload)) return videogame
                    // videogame.genres.find(e => e === action.payload)
                    // return videogame;
                }

            })
            return {
                ...state,
                videogameFilter: filterGenre,

            }


        case FILTER_PLATFORMS:
            let filterPlatforms = [...state.videogames];
            // platforms
            if (action.payload !== '') {
                filterPlatforms = filterPlatforms.filter((e) => {
                    if (e.platforms?.includes(action.payload)) {
                        return e;
                    }
                });
            }
            if (filterPlatforms.length >= 1) {
                return {
                    ...state,
                    videogameFilter: filterPlatforms,
                    error: false
                }
            } else {
                console.log(action.payload);
                return {
                    ...state,
                    videogameFilter: filterPlatforms,
                    error: true,
                }

            }

        default:
            return state;
    }

}