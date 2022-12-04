import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../cards/Card";
export default function Home() {
    const dispatch = useDispatch()

    const allVideogames = useSelector((state) => state.videogames)
    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }
    console.log(allVideogames)
    return (
        <div>
            <Link to="/videogames">Create New Videogame</Link>
            <h1>Video Game Store</h1>
            {/* <button>onClick = {e => { handleClick(e) }}</button> */}
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="videogames">videojuegos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                <select>
                    <option value="genres">generos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                {
                    allVideogames?.map((v) => {
                        console.log(allVideogames)
                        return(
                            <Fragment >
                            <Link to  = {"/home/" + v.id}>
                        <Card name= {v.name} genre= {v.genre} image= {v.img} key = {v.id}></Card>
                        </Link>
                        </Fragment>
                        );
                    })
                }
            </div>
        </div>
    )
}