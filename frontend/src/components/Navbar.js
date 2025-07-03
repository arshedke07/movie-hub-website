import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     const form = event.target;
    //     const formdata = new FormData(form);

    //     const url = "http://localhost:3001/upload";

    //     const fetchOptions = {
    //         method: 'post',
    //         body: formdata
    //     }

    //     try {
    //         let response = await fetch(url, fetchOptions)
    //         if (response.ok) {
    //             alert("file uploaded successfully");
    //         } else {
    //             alert("cannot upload file");
    //         }
    //     }
    //     catch (error) {
    //         console.error("error occurred while uploading file: ", error);
    //         alert("error occurred while uploading file")
    //     }
    // }

    const logoutUser = async () => {
        const url = "http://localhost:3001/api/logout"
        const response = await fetch(url, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error("Error destroying session")
        }

        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/dashboard">The Movie Hub</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard">TV</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard">My List</a>
                        </li>

                    </ul>
                    <button type="submit" className="btn btn-primary mx-3" onClick={logoutUser}>Logout</button>
                    {/* <form method="post" encType="multipart/form-data" className="d-flex" onSubmit={handleSubmit}>
                        <label htmlFor="myfile">Select a file:</label>
                        <input type="file" id="myfile" name="myfile" /><br />
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form> */}

                </div>
            </div>
        </nav>
    );
};
