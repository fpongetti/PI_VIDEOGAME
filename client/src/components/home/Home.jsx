import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenre, filterGenre, Sort, sortRating } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../cards/Card";
import Pagination from "../paginado/Paginado";
export default function Home() {
    const dispatch = useDispatch()
    const allGenres = useSelector((state) => state.genres)
    const allVideogames = useSelector((state) => state.videogameFilter)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenre());
    }, [dispatch])
    function handleGenreFilter(e) {
        e.preventDefault();
        dispatch(filterGenre(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    function handleSortRating(e) {
        e.preventDefault();
        dispatch(sortRating(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }
    function handleSort(e) {
        e.preventDefault();
        dispatch(Sort(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }
    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }
    return (
        <div>
            <Link to="/videogames">Create New Videogame</Link>
            <h1>Video Game Store</h1>
            <div>
                <select onChange={(e) => handleSortRating(e)} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Rating</option>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>
                <select onChange={(e) => handleSort(e)} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Alphabetical</option>
                    <option value="atoz">A-Z</option>
                    <option value="ztoa">Z-A</option>
                </select>
                <select>
                    <option value="videogames">videojuegos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                <select onChange={(e) => handleGenreFilter(e)} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Select...</option>
                    <option value='all' >All genres</option>
                    {allGenres?.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
                </select>
                {
                    currentVideogames?.map((v) => {

                        return (
                            <Fragment >
                                <Link to={"/home/" + v.id}>
                                    <Card name={v.name} genre={v.genre} image={v.image} key={v.id}></Card>

                                </Link>
                            </Fragment>
                        );
                    })
                }
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} videogamesPerPage={videogamesPerPage} totalVideogames={allVideogames.length} paginate={paginate}></Pagination>
            </div>
        </div>
    )
}