import React from 'react'
import Movie from './Movie'

export default function MovieList({ movies }) {
  return (
    movies.map((movie) => {
        if(movie.poster_path){
          return <Movie key={movie.id} movie={movie}/>
        }else{
          return null;
        }
    })
  )
}
