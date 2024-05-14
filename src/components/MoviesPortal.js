import { useState, useEffect } from "react";
import { fetchMovies } from "../api/fetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetail from "./MovieDetail";
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap-icons/font/bootstrap-icons.css";


function MoviesPortal() {
    const styles = {
        container : {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          
        },
    }

    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false) // default state is no error (nothing being looked up)
    const [loading, setLoading] = useState(false); // default state is nothing is loading (nothing being looked up)
    const [currentPage, setCurrentPage] = useState(1); //default page is 1

   // Reset currentPage when form is submitted
   useEffect(() => {
    setCurrentPage(1);
}, [enteredSearchText]);

    const onSearchTextEnter = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchMovies(searchInputText, currentPage, setMovies, setError, () => {
            setEnteredSearchText(searchInputText)
            setLoading(false);
        });
    };
    const handleNextPage = (e) => {
        setLoading(true);
        e.preventDefault();
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchMovies(searchInputText, nextPage, setMovies, setError, () => {
            setEnteredSearchText(searchInputText)
            setLoading(false);
        });
    };
    
    const handlePreviousPage = (e) => {
        setLoading(true);
        e.preventDefault();
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        fetchMovies(searchInputText, prevPage, setMovies, setError, () => {
            setEnteredSearchText(searchInputText)
            setLoading(false);
        });
    };

    return (
        <>
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={onSearchTextEnter}>
                    <input
                        type="text" placeholder="Enter a Movie Title 🎬" className="form-control"
                        value={searchInputText}
                        onChange={(e) => setSearchInputText(e.target.value)}
                        
                        />
                        
                        <button type="submit" className="btn btn-primary">Search&nbsp;<i class="bi bi-search"></i></button>
                </form>
            </div>
        </div>
        
        <br/>
        
        <div class="btn-group" role="group" aria-label="page buttons">
            {currentPage > 1 && <button type="button" class="btn btn-secondary" onClick={handlePreviousPage }style={{ marginRight: '10px' }}>Previous Page</button>}
            {currentPage < 100 && movies.length >= 1 && <button type="button" class="btn btn-secondary" onClick={handleNextPage}>Next Page</button>}
        </div>
        {movies.length > 0 &&  <h1>Titles</h1>}
        {loading && <div style={styles.container}><Spinner animation="border" role="status"> <span className="visually-hidden">Loading...</span> </Spinner></div>}
        {error && <ErrorAlert error={error} searchTerm={enteredSearchText}/>}
        <br/>
        {movies.length > 0 &&  <p className='text-light'>Page {currentPage} : Showing {movies.length} Movies for '{enteredSearchText}'</p>}
        {movies.map((movie) => (
            <MovieDetail key={movie.imdbID} movie={movie} />
        ))}

        </>
    );
}

export default MoviesPortal;