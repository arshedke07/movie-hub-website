import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import Navbar from './Navbar';
import MovieItem from './MovieItem';

// Styled Components for Movie Grid
// const MovieGrid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     max-width: 1350px;
//     margin: auto;
//     gap: 20px;
//     padding: 20px;

//     @media (min-width: 900px) {
//         grid-template-columns: repeat(3, 1fr); /* Max 3 columns */
//     }
// `;

export default function CreatorDashboard({ onOpen }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const url = "http://localhost:3001/api/getmovie"
        fetch(url)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    return (
        <>
            <Navbar />

            <div className="bg-light p-5 rounded-lg m-3">
                <h1 className="display-4">Hello, Arsh!</h1>
                <p className="lead">
                    This is a simple hero unit, a simple jumbotron-style component for calling extra attention
                    to featured content or information.
                </p>
                <hr className="my-4" />
                <p>
                    It uses utility classes for typography and spacing to space content out within the larger container.
                </p>
                <button className="btn btn-primary" onClick={onOpen}>
                    Upload New Movie
                </button>
            </div>

            <h2 className="mx-3">Uploaded Movies</h2>

            {/* Movie Grid using Styled Component */}
            {/* <MovieGrid>
                <MovieItem />
            </MovieGrid> */}
            <div className='row'>
                <div className='col-md-4'>
                    {items.map((item) => (
                        <MovieItem key={item.Id} name={item.Name} description={item.Description} genre={item.Genres} />
                    ))}
                </div>
            </div>
        </>
    )
}
