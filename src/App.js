import { useState, useEffect } from 'react'
import './App.css'
import Movie from './components/Movie'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Details from './pages/Details';

function App() {

  const { REACT_APP_API_KEY } = process.env;

  const MOVIES_API = `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&page=1&vote_count.gte=1000`
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&query=`

  const [movieData, setMovieData] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAPIData(MOVIES_API);
  }, []);

  useEffect(() => {
    movieSearch ? getAPIData(SEARCH_API + movieSearch) : getAPIData(MOVIES_API);
  }, [movieSearch])



  const getAPIData = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieData(responseJson.results);
  };

  const handleChange = (e) => {
    setMovieSearch(e.target.value);
  };


  return (
    <div className='App'>
      <header className='App-header'>
        <h1 onClick={() => navigate("/movie-app")}>Movie App</h1>
        <input type='text' placeholder='Search' className='searchInput' onChange={handleChange} value={movieSearch || ''}></input>
      </header>

      <Routes>
        <Route path="/movie-app"
          element={
            <div className='movieList'>
              {movieData.map(movie => <Movie movie={movie} key={movie.id} />)}
            </div>} />
        <Route path="/movies/details/:id" element={<Details></Details>} />
      </Routes>


    </div>
  )
}

export default App
