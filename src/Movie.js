import React, { useState, useContext } from 'react'
import { FavouriteMoviesContext } from './App'
import './Movie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart , faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const genres = {28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"}



export default function Movie( {movie} ) {
  const [isLiked,setIsLiked] = useState(movie.isLiked);
  const [favouriteMovies,setFavouriteMovies] = useContext(FavouriteMoviesContext);
  const [isOpen,setIsOpen] = useState(false);
  function handleLike(id){
    movie.isLiked = !movie.isLiked;
    setIsLiked(movie.isLiked)
    if(movie.isLiked){
      if(!favouriteMovies.find(o => o.id === movie.id)){
        setFavouriteMovies([...favouriteMovies,movie])
      }
    }else if(!movie.isLiked){
      const arr = favouriteMovies.filter((movie)=>movie.id!==id);
      setFavouriteMovies(arr);
    }
  }

  function onClose(){
    setIsOpen(false);
  }
  

  return (
    <div className="movie">
      <img src={`${IMAGE_URL}${movie.poster_path}`} alt="alt" onClick={()=>setIsOpen(true)}></img>
      {/* n */}
      <span className="heart" onClick={()=>handleLike(movie.id)} style={{color: isLiked? "red" : "white"}}><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></span>
      <div className="info">
          <div className="title-rating">
              <h4 className="title">{movie.title}</h4>
              <h5 className="rating">{movie.vote_average}<FontAwesomeIcon icon={faStar}></FontAwesomeIcon></h5>
          </div>
          <div className="genres">
              {movie.genre_ids.map((id) => {
                  return <span key={id}>{genres[id]}</span>
              })}
          </div>
      </div>
    </div>
  )
}
