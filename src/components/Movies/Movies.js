import React, { useState } from 'react';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoreButton from '../MoreButton/MoreButton';
import movieApi from '../../utils/MovieApi.js';
import SearchInfo from '../SearchInfo/SearchInfo';
import { AppContext } from '../../contexts/AppContext';
import { constants } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

function Movies(props) {
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('films')) || []);
  const [filteredMovies, setFilteredMovies] = React.useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [uploadedMoviesCount, setUploadedMoviesCount] = React.useState(JSON.parse(localStorage.getItem('uploadedMoviesCount')) || 0);
  const [uploadedMovies, setUploadedMovies] = React.useState(filteredMovies.slice(0, uploadedMoviesCount));
  const [searchValues, setSearchValues ] = React.useState(JSON.parse(localStorage.getItem('search')) || {
    film: '',
    isShortFilms: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState('');
  const { showPopup } = React.useContext(AppContext);
  const [didMount, setDidMount] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);

  React.useEffect(() => {
    setDidMount(true);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('films', JSON.stringify(movies));
  }, [movies]);

  React.useEffect(() => {
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    if (didMount) addMovies(getInitialMoviesCount());
  }, [filteredMovies]);

  React.useEffect(() => {
    localStorage.setItem('uploadedMoviesCount', uploadedMoviesCount);
  }, [uploadedMoviesCount]);

  function getInitialMoviesCount() {
    if (window.innerWidth < constants.MOBILE_WIDTH) return constants.MOBILE_INITIAL_CARDS_COUNT;
    else if (window.innerWidth < constants.MEDIUM_WIDTH) return constants.MOBILE_MEDIUM_INITIAL_CARDS_COUNT;
    else if (window.innerWidth < constants.LARGE_WIDTH) return constants.MEDIUM_LARGE_INITIAL_CARDS_COUNT;
    else return constants.LARGE_INITIAL_CARDS_COUNT;
  }

  function getMoreMoviesCountListener() {
    if (window.innerWidth < constants.MOBILE_WIDTH) return constants.MOBILE_MORE_CARDS_COUNT;
    else if (window.innerWidth < constants.MEDIUM_WIDTH) return (constants.MOBILE_MEDIUM_MORE_CARDS_COUNT - (uploadedMoviesCount % constants.MOBILE_MEDIUM_MORE_CARDS_COUNT));
    else if (window.innerWidth < constants.LARGE_WIDTH) return (constants.MEDIUM_LARGE_MORE_CARDS_COUNT - (uploadedMoviesCount % constants.MEDIUM_LARGE_MORE_CARDS_COUNT));
    else return (constants.LARGE_MORE_CARDS_COUNT - (uploadedMoviesCount % constants.LARGE_MORE_CARDS_COUNT));
  }

  function addMovies(addCount) {
    let addMoviesCount;
    if (filteredMovies.length < uploadedMoviesCount + addCount) {
      addMoviesCount = filteredMovies.length - uploadedMoviesCount;
    }
    else {
      addMoviesCount = addCount;
    }

    setUploadedMovies((prev) => prev.concat(filteredMovies.slice(uploadedMoviesCount, uploadedMoviesCount + addMoviesCount)));
    setUploadedMoviesCount(uploadedMoviesCount + addMoviesCount);
  }

  function onLikeButtonClick(movieData) {
    const movies = JSON.parse(localStorage.getItem('films'));
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));

    const moviesIndex = movies.findIndex(movie => movie.id === movieData.id);
    const filteredMoviesIndex = filteredMovies.findIndex(filteredMovie => filteredMovie.id === movieData.id);

    movies[moviesIndex].isLiked = !movies[moviesIndex].isLiked;
    movies[moviesIndex]._id = movieData._id;
    filteredMovies[filteredMoviesIndex].isLiked = !filteredMovies[filteredMoviesIndex].isLiked;
    filteredMovies[filteredMoviesIndex]._id = movieData._id;
    setMovies(movies);
    setFilteredMovies(filteredMovies);
    localStorage.setItem('films', JSON.stringify(movies));
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  }

  function handleMovieSearch({film, isShortFilms}) {
    setIsLoading(true);
    setUploadedMovies([]);
    setUploadedMoviesCount(0);
    setFilteredMovies([]);
    setMovies(JSON.parse(localStorage.getItem('films')));
    setIsInputDisabled(true);

    if (movies.length === 0) {
      Promise.all([movieApi.getMovies(), mainApi.getSavedMovies()])
        .then(([initialMovies, savedMovies]) => {
          initialMovies.forEach(movie => {
            const match = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
            movie.isLiked = match ? true : false;
            movie.image.url = 'https://api.nomoreparties.co/' + movie.image.url;
            movie._id = match ? match._id : '';
          });
          return Promise.resolve(initialMovies)
        })
        .then(movies => {
          setMovies(movies);
          setFilteredMovies(movieApi.filterMovies(movies, {film, isShortFilms}));
        })
        .catch(err => {
          setSearchError(err);
          showPopup('При поиске произошла ошибка. Повторите позже', 'fail');
        })
        .finally(() => {
          setIsLoading(false);
          setIsInputDisabled(false);
        })
    }
    else {
      setFilteredMovies(movieApi.filterMovies(movies, {film, isShortFilms}));
      setIsLoading(false);
      setIsInputDisabled(false);
    }
    localStorage.setItem('search', JSON.stringify({film, isShortFilms}));
  }

  function onMoreButtonClick() {
    setIsLoading(true);
    addMovies(getMoreMoviesCountListener());
    setIsLoading(false);
  }

  function onShortMoviesFilterClick(searchValues) {
    const lastSearch = JSON.parse(localStorage.getItem('search'));
    if (lastSearch && lastSearch.film === searchValues.film) {
      handleMovieSearch(searchValues);
    }
  }


  return (
    <>
      <Header/>
      <main>
        <section className='movies'>
          <SearchForm onSubmit={handleMovieSearch} onShortMoviesFilterClick={onShortMoviesFilterClick} values={searchValues} isInputDisabled={isInputDisabled}/>
          {uploadedMovies.length > 0
            ? <MoviesCardList movies={uploadedMovies} handleLikeClick={onLikeButtonClick}/>
            : <></>
          }
          {isLoading
            ? <Preloader/>
            : uploadedMovies.length && uploadedMoviesCount < filteredMovies.length
              ?
                <>
                  <SearchInfo movies={uploadedMovies} error={searchError} />
                  <MoreButton onClick={onMoreButtonClick}/>
                </>
              : <SearchInfo movies={uploadedMovies} error={searchError} />
          }
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;