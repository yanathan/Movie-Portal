
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from "../api/fetchMovies";
import Spinner from 'react-bootstrap/Spinner';

const apiKey = ''; 

function MoviePage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailerVideoId, setTrailerVideoId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await fetchMovieDetails(id);
                setMovieDetails(details);
                fetchTrailer(details.Title, details.Released);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDetails();
    }, [id]);

    const fetchTrailer = async (title, releaseYear) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(`${title} ${releaseYear} trailer`)}&key=${apiKey}`
            );
            const data = await response.json();
            const videoId = data.items?.[0]?.id?.videoId;
            setTrailerVideoId(videoId);
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movieDetails || trailerVideoId === null) {
        return <Spinner animation="border" role="status"> <span className="visually-hidden">Loading...</span> </Spinner>;
    }

    return (
        <div>
          
            <h1>{movieDetails.Title}</h1>
            <small className="text-body-secondary"><h6>{movieDetails.Year} • {movieDetails.Rated} • {movieDetails.Runtime}</h6></small>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <br/><br/>
            
            {trailerVideoId ? (
                <div className="video-container" style={{ marginLeft: '7px' }}>
                    <iframe
                        title="YouTube Trailer"
                        width="700"
                        height="450"
                        src={`https://www.youtube.com/embed/${trailerVideoId}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <div>No trailer found</div>
            )}
            </div>
            <br/>
            <br/>
            {movieDetails.Genre.split(',').map((genre, index) => (<button key={index} className="btn btn-primary" disabled style={{ marginRight: '5px' }}>{genre.trim()}</button>))}
            <br/>
            <br/>
            <h4>Plot</h4>
            <p>{movieDetails.Plot}</p>
            <br/>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Staff</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-active">
                        <th scope="row">Director</th>
                        <td>{movieDetails.Director}</td>
                    </tr>
                    <tr>
                        <th scope="row">Writers</th>
                        <td>{movieDetails.Writer}</td>
                    </tr>
                    <tr className="table-active">
                        <th scope="row">Stars</th>
                        <td>{movieDetails.Actors}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      
    );
}

export default MoviePage;
