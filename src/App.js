import React from 'react';
import Header from './components/Header';
import MoviesPortal from './components/MoviesPortal';
import MovieDetail from './components/MovieDetail';
import MoviePage from './components/MoviePage';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <br />
        <div className='container'>
    
          <Routes>
            <Route exact path='/' element={<MoviesPortal/>} />
            <Route exact path='/movie/:id' element={<MoviePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

