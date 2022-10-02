import React , { useState , useEffect } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import MovieList from './MovieList';

const API_KEY = 'api_key=e9246bccac0cc37bfa23da854731c67b';
const BASE_URL = 'https://api.themoviedb.org/3';
const CURR_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const OPTIONS_URL = `${BASE_URL}/genre/movie/list?${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&query=`;

function App() {
  const [movies,setMovies] = useState([]);
  const [genreOptions,setGenreOptions] = useState([]);
  const [sortByOptions,setSortByOptions] = useState([]);
  const [searchText,setSearchText] = useState("");
  useEffect(() => {
    fetch(CURR_URL).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
    fetch(OPTIONS_URL).then(res => res.json()).then(data => {
      setGenreOptions(data.genres.map(genre => genre.name));
    });
    setSortByOptions(["Rating","Year","Runtime"]);
  },[]);

  function handleSearchTextChange(e){
    setSearchText(e.target.value);
  }

  function handleMovies(e){
    e.preventDefault();
    if(searchText){
      fetch(SEARCH_URL+searchText).then(res => res.json()).then(data => {
        setMovies(data.results);
      });
    }else{
      fetch(CURR_URL).then(res => res.json()).then(data => {
        setMovies(data.results);
      });
    }
  }

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
        <form onSubmit={handleMovies}>
          <input type="text" placeholder="Search" value={searchText} className="search" onChange={handleSearchTextChange}></input>
        </form>
      </div>
      <div className='main'>
        <MovieList movies={movies}/>
      </div>
    </>
  )
}

export default App;
