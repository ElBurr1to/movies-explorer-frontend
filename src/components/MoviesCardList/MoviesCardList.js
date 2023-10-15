import Container from '../Container/Container';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className='movies-list'>
      <Container>
        <ul className='movies-list__list'>
          {props.movies.map(movie => (
            <li className='movies-list__list-item' key={movie.id}>
              <MoviesCard movie={movie} handleLikeClick={props.handleLikeClick}/>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default MoviesCardList;