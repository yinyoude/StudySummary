import React, {useReducer, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = "http://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default: 
      return state;
  }
}

function App() {
  /* 使用 useReducer，不用每个对象都使用 useState */
  /* const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); */

  const [state, dispatch] = useReducer(reducer, initialState);

/*   useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonRequest => {
      setMovies(jsonRequest.Search);
      setLoading(false);
    })
  }, []); */

  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonRequest => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonRequest.Search
      })
    })
  }, []);

  /* const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    .then(response => response.json())
    .then(jsonRequest => {
      if(jsonRequest.Response == 'True') {
        setMovies(jsonRequest.Search);
        setLoading(false);
      } else {
        setErrorMessage(jsonRequest.Error);
        setLoading(false);
      }
    })
  } */

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    .then(response => response.json())
    .then(jsonRequest => {
      if(jsonRequest.Response == 'True') {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonRequest.Search
        })
      } else {
        dispatch({
          type: 'SEARCH_MOVES_FAILURE',
          error: jsonRequest.Error
        })
      }
    })
  }

  const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">sharing a few of our faviourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
