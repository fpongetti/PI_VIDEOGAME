import axios from "axios";

export const SORT = 'SORT';
export const SORT_RATING = 'SORT_RATING';
export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_NAME = 'GET_VIDEOGAME_NAME';
export const FILTER_GENRE = 'FILTER_GENRE';
export const FILTER_DB = 'FILTER_DB';
export const FILTER_PLATFORMS = 'FILTER_PLATFORMS';
export const GET_GENRE = 'GET_GENRE';
export const GET_VIDEOGAMES_API = "GET_VIDEOGAMES_API";


export const getVideogames = () => {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames`)
            .then(json => {
                dispatch({ type: GET_VIDEOGAME, payload: json.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

}
export const getVideogamesApi = () => {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames/api`)
            .then(json => {
                dispatch({ type: GET_VIDEOGAMES_API, payload: json.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

}
export const getComplete = () => {
    return {
        type: GET_VIDEOGAME,
        payload: ''
    }
}


export const searchVideogame = (name) => {
    return function (dispatch) {

        return axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(json => {
                dispatch({ type: GET_VIDEOGAME_NAME, payload: json.data });
            })
            .catch(err => {
                console.log(err);
            })
    }
}



export const Sort = (payload) => {
    //alphabetical
    return {
        type: SORT,
        payload
    }

}


export const sortRating = (payload) => {
    //rating
    return {
        type: SORT_RATING,
        payload
    }

}

export const filterDb = (db) => {
    console.log(db)

    return {
        type: FILTER_DB,
        payload: db,
    }

}

export const filterPlatforms = (platforms) => {

    return {
        type: FILTER_PLATFORMS,
        payload: platforms,
    }

}
export const filterGenre = (payload) => {

    return {
        type: FILTER_GENRE,
        payload
    }

}

export const getGenre = () => {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/genres`)
            .then(json => {
                dispatch({ type: GET_GENRE, payload: json.data });
            })
            .catch(err => {
                console.log(err);
            })
    }
}