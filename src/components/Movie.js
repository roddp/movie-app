import React from 'react'
import "../App.css"

const Movie = ({ movie }) => {

  const IMAGES_URL = 'https://image.tmdb.org/t/p/w1280';

  return (
    <div className='movieContainer'>

      <img alt='movie' src={IMAGES_URL + movie.poster_path}></img>

      <div className='movieInfo'>
        <span> {Math.round((movie.vote_average + Number.EPSILON) * 100) / 100} &#11088;</span>
        <h3>{movie.original_title}</h3>
      </div>
    </div>
  )
}

export default Movie