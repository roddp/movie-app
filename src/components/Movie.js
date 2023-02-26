import React from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie }) => {

  const IMAGES_URL = 'https://image.tmdb.org/t/p/w1280';
  const navigate = useNavigate();

  return (

    <div className='movieContainer' onClick={() => navigate(`movies/details/${movie.id}`)}>

      <img alt='movie' src={IMAGES_URL + movie.poster_path}></img>

      <div className='movieInfo'>
        <span> {Math.round((movie.vote_average + Number.EPSILON) * 100) / 100} &#11088;</span>
        <p>{movie.original_title}</p>
      </div>
    </div >
  )
}

export default Movie