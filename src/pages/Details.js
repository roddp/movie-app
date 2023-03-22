import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import StarRating from 'react-star-ratings'
import './Details.css';
import notFoundImg from '../assets/notfoundImg.jpg';

const Details = () => {
  let { id } = useParams();
  const { REACT_APP_API_KEY } = process.env;

  const API_SEARCHID = `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`;

  const [movieDetails, setMovieDetails] = useState([]);

  const IMAGES_URL = 'https://image.tmdb.org/t/p/w1280';

  const getMovieDetails = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieDetails(responseJson);
  }

  useEffect(() => {
    getMovieDetails(API_SEARCHID);
  }, []);

  const ratingRounded = Math.round((movieDetails.vote_average + Number.EPSILON) * 100) / 100;

  return (movieDetails ?
    <div className='detailsContainer'>
      <img className='movieImg' src={movieDetails.backdrop_path !== null ? IMAGES_URL + movieDetails.backdrop_path : notFoundImg} alt="poster" />

      <div className='movieContent'>
        <h3 className='movieTitle'>{movieDetails.title}</h3>
        <div className='movieRating'>
          <StarRating
            rating={movieDetails.vote_average}
            starRatedColor='yellow'
            numberOfStars={10}
            starDimension='15px'
            starSpacing='3px'
          />
          <span> {ratingRounded} ({movieDetails.vote_count})</span>

          <div className='tags'>
            {movieDetails.genres?.map(tag => (<span className='genreTag' key={tag.id}>{tag.name}</span>))}
          </div>

          <div className='movieOverview'>
            <h4>Overview:</h4>
            <p>{movieDetails.overview}</p>
            <h4>Production:</h4>
            {movieDetails.production_companies?.map(prod => (<div className='prodContainer'>{prod.name}</div>))}
            <h4>Year:</h4>
            <p>{movieDetails.release_date}</p>
          </div>

        </div>

      </div>
    </div>

    : <div>Loading</div>)
}

export default Details