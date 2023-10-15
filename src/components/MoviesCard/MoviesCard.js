import React from "react";
import { useLocation } from "react-router-dom";

import './MoviesCard.css';
import mainApi from '../../utils/MainApi';
import { AppContext } from '../../contexts/AppContext';


function MoviesCard(props) {
  const { pathname } = useLocation();
  const [movieData, setMovieData] = React.useState(props.movie);
  const { showPopup } = React.useContext(AppContext);

  function displayDuration(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours ? hours + ' ч ' : ''}${minutes ? minutes + ' м' : ''}`;
  }

  function onLikeMovieClick(movieData) {
    return mainApi.addMovie(movieData);
  }

  function onDeleteMovieClick(movieId) {
    return mainApi.deleteMovie(movieId);
  }



  function handleLikeButtonClick(event) {
    if (movieData.isLiked)
    {
      onDeleteMovieClick(movieData._id)
        .then(() => {
          props.handleLikeClick(movieData, event.target);
          setMovieData({...movieData, isLiked: !movieData.isLiked});
        })
        .catch((err) => {
          showPopup('Произошла ошибка. Попробуйте позже!!!', 'fail');
        });
    }
    else {
      const movie = {
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: movieData.image.url,
        trailerLink: movieData.trailerLink,
        thumbnail: 'https://api.nomoreparties.co/' + movieData.image.formats.thumbnail.url,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      };
      onLikeMovieClick(movie)
        .then((movie) => {
          const newMovieData = {
            ...movieData,
            isLiked: !movieData.isLiked,
            _id: movie._id,
          }
          setMovieData(newMovieData);
          props.handleLikeClick(newMovieData);
          })
          .catch((err) => {
            showPopup('Произошла ошибка. Попробуйте позжеFFF', 'fail');
          });
    }
  }

  return (
    <figure className='movies-card'>
      <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
        <img src={movieData.image.url} alt='фильм' className='movies-card__poster'/>
      </a>
      <figcaption className='movies-card__info'>
        <div className='movies-card__name-container'>
          <p className='movies-card__name'>{movieData.nameRU}</p>
          <button className={`movies-card__button ${movieData.isLiked ? 'movies-card__button_liked' : ''}
          ${pathname === '/movies' ? 'movies-card__button_like' : 'movies-card__button_delete'}`}
          onClick={handleLikeButtonClick}></button>
        </div>
        <p className='movies-card__duration'>{displayDuration(movieData.duration)}</p>
      </figcaption>
    </figure>
  );
}

export default MoviesCard;