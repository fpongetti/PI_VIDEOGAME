import React from "react";

const Pagination = ({ videogamesPerPage, totalVideogames, paginate, currentPage, setCurrentPage }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
        pageNumber.push(i);

    }
    const nextPage = () => {
        setCurrentPage(currentPage + 1)

    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }
    return (
        <div>
            <button onClick={prevPage} disabled={currentPage === pageNumber[0] ? true : false}>prev</button>
            {

                pageNumber.map(number => (
                    <button key={number} onClick={() => paginate(number)} href="/home">{number}</button>
                ))
            }
            <button onClick={nextPage} disabled={currentPage === pageNumber.length ? true : false}>next</button>
        </div>
    )
}

export default Pagination;