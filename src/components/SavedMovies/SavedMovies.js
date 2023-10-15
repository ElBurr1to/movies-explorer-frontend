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
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState(JSON.parse(localStorage.getItem('filteredSavedMovies')) || []);
  const [filteredSearchValues, setFilteredSearchValues ] = React.useState(JSON.parse(localStorage.getItem('savedSearch')) || {
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

    setFilteredSearchValues({film, isShortFilms});
    localStorage.setItem('savedSearch', JSON.stringify({film, isShortFilms}));
  }

  function onShortMoviesFilterClick(searchValues) {
    const lastSearch = JSON.parse(localStorage.getItem('savedSearch'));
    if (lastSearch && lastSearch.film === searchValues.film ) {
      handleMovieSearch(searchValues);
    }
  }

  function onDeleteButtonClick(movieData, target) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));
    const movies = JSON.parse(localStorage.getItem('films'));
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));

    const moviesIndex = movies.findIndex(movie => movie.id === movieData.movieId);
    const filteredMoviesIndex = filteredMovies.findIndex(filteredMovie => filteredMovie.id === movieData.movieId);
    const savedMoviesIndex = savedMovies.findIndex(movie => movie.movieId === movieData.movieId);
    const filteredSavedMoviesIndex = filteredSavedMovies.findIndex(filteredMovie => filteredMovie.movieId === movieData.movieId);

    movies[moviesIndex].isLiked = !movies[moviesIndex].isLiked;
    filteredMovies[filteredMoviesIndex].isLiked = !filteredMovies[filteredMoviesIndex].isLiked;
    savedMovies[savedMoviesIndex].isLiked = !savedMovies[savedMoviesIndex].isLiked;
    filteredSavedMovies[filteredSavedMoviesIndex].isLiked = !filteredSavedMovies[filteredSavedMoviesIndex].isLiked;
    setSavedMovies(savedMovies);
    setFilteredSavedMovies(filteredSavedMovies);
    localStorage.setItem('films', JSON.stringify(movies));
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));

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