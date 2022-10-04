import React from 'react'
import Movie from './Movie'

export default function MovieList({ movies }) {
  return (
    movies.map((movie,index) => {
        if(movie.poster_path){
          return <Movie key={index} movie={movie}/>
        }else{
          return null;
        }
    })
  )
}
