import React, { useEffect, useState, useRef } from 'react'
import MovieItem from './MovieItem'
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [username, setUsername] = useState("")
    const fetched = useRef(false) // useRef prevents fetching api multiple time
    const navigate = useNavigate()
    const [items, setItems] = useState([])

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true

        fetch("http://localhost:3001/api/login", {
            method: "GET",
            credentials: "include", // Ensures cookies are sent
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.username) {
                    navigate('/')
                } else {
                    setUsername(data.username || "Try Logging in First");
                }
            })
            .catch((error) => console.error("Error fetching session:", error));
    }, [navigate]);

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
            <div className='container my-3'>
                <h3>Hello {username}</h3>
                <div className='row'>
                    <div className='col-md-4'>
                        {items.map((item) => (
                            <MovieItem key={item.Id} name={item.Name} description={item.Description} genre={item.Genres} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}