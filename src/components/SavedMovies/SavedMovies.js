import React, { useState } from 'react';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchInfo from '../SearchInfo/SearchInfo';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AppContext } from '../../contexts/AppContext';
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MovieApi.js';

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [filteredSearchValues, setFilteredSearchValues ] = React.useState({
    film: '',
    isShortFilms: false,
  });
  const [searchError, setSearchError] = React.useState('');
  const { showPopup } = React.useContext(AppContext);

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then(movies => {
        movies.forEach(movie => {
          movie.isLiked = true;
          movie.image = {'url': movie.image};
          movie.id = movie.movieId;
        });
        setSavedMovies(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        if (filteredSearchValues.film === '' && !filteredSearchValues.isShortFilms) setFilteredSavedMovies(movies);
      })
      .catch(err => {
        setSearchError(err);
        showPopup('При поиске произошла ошибка. Повторите позже', 'fail');
      })
  }, []);

  React.useEffect(() => {
    localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
  }, [filteredSavedMovies]);

  function onMovieInputChange(searchValues) {
    if (!searchValues.film) {
      setFilteredSavedMovies(savedMovies);
      localStorage.setItem('savedSearch', JSON.stringify(searchValues));
    }
  }

  function handleMovieSearch({film, isShortFilms}) {
    const searchResult = movieApi.filterMovies(savedMovies, {film, isShortFilms});
    setFilteredSavedMovies(searchResult);
    console.log(searchResult);

    setFilteredSearchValues({film, isShortFilms});
    localStorage.setItem('savedSearch', JSON.stringify({film, isShortFilms}));
  }

  function onShortMoviesFilterClick(searchValues) {
    const lastSearch = JSON.parse(localStorage.getItem('savedSearch'));
    if (!lastSearch || lastSearch.film === searchValues.film) handleMovieSearch(searchValues);
  }

  function onDeleteButtonClick(movieData, target) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies.length) {
      const savedMoviesIndex = savedMovies.findIndex(movie => movie.id === movieData.id);
      savedMovies[savedMoviesIndex].isLiked = !savedMovies[savedMoviesIndex].isLiked;
      setSavedMovies(savedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }

    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));
    if (filteredSavedMovies.length) {
      const filteredSavedMoviesIndex = filteredSavedMovies.findIndex(filteredMovie => filteredMovie.id === movieData.id);
      filteredSavedMovies[filteredSavedMoviesIndex].isLiked = !filteredSavedMovies[filteredSavedMoviesIndex].isLiked;
      setFilteredSavedMovies(filteredSavedMovies);
      localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
    }

    const movies = JSON.parse(localStorage.getItem('films'));
    if (movies.length) {
      const moviesIndex = movies.findIndex(movie => movie.id === movieData.id);
      movies[moviesIndex].isLiked = !movies[moviesIndex].isLiked;
      localStorage.setItem('films', JSON.stringify(movies));
    }

    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (filteredMovies.length) {
      const filteredMoviesIndex = filteredMovies.findIndex(filteredMovie => filteredMovie.id === movieData.id);
      filteredMovies[filteredMoviesIndex].isLiked = !filteredMovies[filteredMoviesIndex].isLiked;
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    }

    target.closest('.movies-list__list-item').remove();
  }


  return (
    <>
      <Header />
      <main>
        <section className='saved-movies'>
          <SearchForm onSubmit={handleMovieSearch} onMovieInputChange={onMovieInputChange} onShortMoviesFilterClick={onShortMoviesFilterClick} values={filteredSearchValues}/>
          <MoviesCardList movies={filteredSavedMovies} handleLikeClick={onDeleteButtonClick}/>
          <SearchInfo movies={filteredSavedMovies} error={searchError} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;