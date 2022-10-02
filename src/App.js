import React , { useState , useEffect } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import MovieList from './MovieList';

const API_KEY = 'api_key=e9246bccac0cc37bfa23da854731c67b';
const BASE_URL = 'https://api.themoviedb.org/3';
const CURR_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const OPTIONS_URL = `${BASE_URL}/genre/movie/list?${API_KEY}`;

function App() {
  const [movies,setMovies] = useState([]);
  const [genreOptions,setGenreOptions] = useState([]);
  const [sortByOptions,setSortByOptions] = useState(["Rating","Year","Runtime"]);
  useEffect(() => {
    fetch(CURR_URL).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
    fetch(OPTIONS_URL).then(res => res.json()).then(data => {
      setGenreOptions(data.genres.map(genre => genre.name));
    });
  },[]);

  return(
    <>
      <div className="header">
        <div>
          <div className="filter-container">
            <span>Genre:</span>
            <Dropdown options={genreOptions}/>
          </div>
          <div className="filter-container">
            <span>Sort By:</span>
            <Dropdown options={sortByOptions}/>
          </div>
        </div>
        <input type="text" placeholder="Search" className="search"></input>
      </div>
      <div className='main'>
        <MovieList movies={movies}/>
      </div>
    </>
  )
}

export default App;
