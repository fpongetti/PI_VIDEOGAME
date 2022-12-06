import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame } from "../../actions";

export default function SearchBar() {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    function handleVideogamesByName(e) {
        e.preventDefault(e);
        dispatch(searchVideogame(search));
        setSearch("")
    }
    function handleImput(e) {
        setSearch(e.target.value)
    }
    console.log(search)
    return (
        <form action="" onSubmit={(e) => { handleVideogamesByName(e) }}>
            <input type="text" onChange={(e) => { handleImput(e) }} value={search} />
            <button type="submit">search</button>
        </form>
    );
}