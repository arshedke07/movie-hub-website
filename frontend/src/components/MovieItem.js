import React from 'react'
import './MovieItem.css'

export default function MovieItem({ name, description, genre }) {
    const playVideo = () => {
        const playButton = document.getElementById('playButton');
        const videoPlayer = document.getElementById('myVideo')

        playButton.addEventListener('click', function () {
            videoPlayer.style.display = 'block'; // Show the video
            videoPlayer.play(); // Start playing the video
            playButton.style.display = 'none'; // Optionally hide the button after clicking
        });

        videoPlayer.addEventListener('ended', function () {
            playButton.style.display = 'block'; // Show the button again
            videoPlayer.style.display = 'none'; // Hide the video
            videoPlayer.currentTime = 0; // Reset video to the beginning
        });
    }

    return (
        <>
            <div className="card">
                <div className="image">
                    <img src="data:image/jpeg;base64,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" alt="movie poster" />
                </div>
                <div className="details">
                    <div className="center">
                        <h1>{name}<br /><span>{genre}</span></h1>
                        <p>{description}</p>
                        <button id="playButton" type="button" className="btn btn-primary">Play</button>
                    </div>
                </div>
            </div>

            <video id="myVideo" controls>
                <source src="your-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
}
