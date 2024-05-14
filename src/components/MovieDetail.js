import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
const apiKey = 'AIzaSyA074EG6rNk95N0b8odIeN_dcvls45JLqI'; // YOUTUBE API key

function MovieDetail({ movie }) {
    return (
        <>
            <div className="row">
                <div className="col-md-2">
                    <Link to={`/movie/${movie.imdbID}`} class="nav-link"><img src={movie.Poster} alt={movie.Title} width='100%' /></Link>
                </div>
                
                <div class='col-md-10'>
                    <div class="card">
                        <div class="card-body">
                            <Link to={`/movie/${movie.imdbID}`} class="nav-link"><h3 class="card-title">{movie.Title}</h3></Link> 
                            <h6 class="card-subtitle mb-2 text-muted">{movie.Released}</h6>
                            <p class="card-text">{movie.Plot}</p>
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" class="card-link"><FontAwesomeIcon icon={faImdb} size="2xl" /></a>
                            <a href={`https://www.youtube.com/results?search_query=${movie.Title} ${movie.Released} trailer`} target="_blank" class="card-link"><FontAwesomeIcon icon={faYoutube} size="2xl" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}

export default MovieDetail;