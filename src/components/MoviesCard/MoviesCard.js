import { useLocation } from "react-router-dom";

import './MoviesCard.css';
import film from '../../images/film.jpg';

function MoviesCard(props) {
  const { pathname } = useLocation();

  return (
    <figure className='movies-card'>
      <img src={film} alt='фильм' className='movies-card__poster'/>
      <figcaption className='movies-card__info'>
        <div className='movies-card__name-container'>
          <p className='movies-card__name'> 33 слова о дизайне</p>
          <button className={`movies-card__button ${pathname === '/movies'
            ? 'movies-card__button_like'
            : 'movies-card__button_delete'}`}></button>
        </div>
        <p className='movies-card__duration'>1ч 42м</p>
      </figcaption>
    </figure>
  );
}

export default MoviesCard;