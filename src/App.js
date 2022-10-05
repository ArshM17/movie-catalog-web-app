import React , { useState , useEffect, createContext } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import MovieList from './MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const FavouriteMoviesContext = createContext();

const API_KEY = 'api_key=e9246bccac0cc37bfa23da854731c67b';
const BASE_URL = 'https://api.themoviedb.org/3';
const CURR_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const OPTIONS_URL = `${BASE_URL}/genre/movie/list?${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&query=`;
const genres = {28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"}
const STORAGE_KEY = 'app.storageKey'

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

const genreIds = swap(genres);

function App() {
  const [movies,setMovies] = useState([]);
  const [genreOptions,setGenreOptions] = useState([]);
  const [sortByOptions,setSortByOptions] = useState([]);
  const [genreOption, setGenreOption] = useState();
  const [sortByOption, setSortByOption] = useState();
  const [searchText,setSearchText] = useState("");
  const [favouriteMovies,setFavouriteMovies] =  useState([]);
  const [favTab, setFavTab] = useState(false);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if(storedFavs) setFavouriteMovies(storedFavs);
    setLoading(true)
    fetch(CURR_URL).then(res => res.json()).then(data => {
      setLoading(false)
      setMovies(data.results.map(movie =>  {
        if(favouriteMovies.find(o => o.id === movie.id)){
          return {...movie,"isLiked":true}
        }
        return {...movie,"isLiked":false}
      }));
    });
    setLoading(true)
    fetch(OPTIONS_URL).then(res => res.json()).then(data => {
      setLoading(false)
      setGenreOptions(data.genres);
    });
    setSortByOptions([{"name":"Popularity","id":0},{"name":"Rating","id":1},{"name":"Date Of Release","id":2},{"name":"Vote Count","id":3}]);
  },[]);

  function handleSearchTextChange(e){
    setSearchText(e.target.value);
  }

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteMovies))
    if(favTab){
      setMovies(favouriteMovies);
    }
  },[favouriteMovies])

  function handleMovies(e){
    setFavTab(false);
    e.preventDefault();
    if(searchText){
      setLoading(true)
      fetch(SEARCH_URL+searchText).then(res => res.json()).then(data => {
        setLoading(false)
        setMovies(data.results.map(movie =>  {
          if(favouriteMovies.find(o => o.id === movie.id)){
            return {...movie,"isLiked":true}
          }
          return {...movie,"isLiked":false}
        }));
      });
    }else{
      setLoading(true)
      fetch(CURR_URL).then(res => res.json()).then(data => {
        setLoading(false)
        // setMovies(data.results.map(movie =>  {return {...movie,"isLiked":false}}));
        setMovies(data.results.map(movie =>  {
          if(favouriteMovies.find(o => o.id === movie.id)){
            return {...movie,"isLiked":true}
          }
          return {...movie,"isLiked":false}
        }));
      });
    }
    setSortByOption("Popularity");
  }

  function handleGenreChange(e){
    setFavTab(false);
    let val = e.target.value;
    setGenreOption(val);
    let id = genreIds[val];
    setLoading(true)
    fetch(`${CURR_URL}&with_genres=${id}`).then(res => res.json()).then(data => {
      setLoading(false)
      // setMovies(data.results.map(movie =>  {return {...movie,"isLiked":false}}));
      setMovies(data.results.map(movie =>  {
        if(favouriteMovies.find(o => o.id === movie.id)){
          return {...movie,"isLiked":true}
        }
        return {...movie,"isLiked":false}
      }));
    });
    setSearchText("");
  }

  function displayFavourites(){
    setFavTab(true);
    setMovies(favouriteMovies);
  }

  function handleHome(){
    setFavTab(false);
    setLoading(true)
    fetch(CURR_URL).then(res => res.json()).then(data => {
      setLoading(false)
      // setMovies(data.results.map(movie =>  {return {...movie,"isLiked":false}}));
      setMovies(data.results.map(movie =>  {
        if(favouriteMovies.find(o => o.id === movie.id)){
          return {...movie,"isLiked":true}
        }
        return {...movie,"isLiked":false}
      }));
    });
  }

  function handleSortByChange(e){
    // setFavTab(false);
    setSortByOption(e.target.value);
    setMovies(prev => {
      switch(e.target.value){
        case "Popularity":
          return prev.sort((a,b)=>b.popularity-a.popularity);
        case "Rating":
          return prev.sort((a,b)=>b.vote_average-a.vote_average);
        case "Date Of Release":
          return prev.sort((a,b)=>b.release_date.localeCompare(a.release_date));
        case "Vote Count":
          return prev.sort((a,b)=>b.vote_count-a.vote_count);
        default:
          return null;
      }
    })
  }

  if(loading) return(
    <div className='loading'>
      Loading...
    </div>
  )

  return(
    <FavouriteMoviesContext.Provider value={[favouriteMovies,setFavouriteMovies]}>
    <>
      <div className="wrapper">
        <div className="header">
            <form onSubmit={handleMovies}>
              <input type="text" placeholder="Search" value={searchText} className="search" onChange={handleSearchTextChange}></input><span className="searchIcon" onClick={handleMovies}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
            </form>
            <div className="home" onClick={handleHome}>
              Home
            </div>
            <div className="filter-container">
              <span>Genre:</span>
              <Dropdown options={genreOptions} selectedOption={genreOption} onChangeOption={handleGenreChange}/>
            </div>
            <div className="filter-container">
              <span>Sort By:</span>
              <Dropdown options={sortByOptions} selectedOption={sortByOption} onChangeOption={handleSortByChange}/>
            </div>
            <div className="fav" onClick={displayFavourites}>
              Favourites
            </div>
        </div>
        <div className='main'>
          <MovieList movies={movies}/>
        </div>
      </div>
    </>
    </FavouriteMoviesContext.Provider>
  )
}

export default App;
