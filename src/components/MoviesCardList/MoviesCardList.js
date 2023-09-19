import Container from '../Container/Container';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className='movies-list'>
      <Container>
        <ul className='movies-list__list'>
          <li className='movies-list__list-item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies-list__list-item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies-list__list-item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies-list__list-item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies-list__list-item'>
            <MoviesCard></MoviesCard>
          </li>
        </ul>
      </Container>
    </section>
  );
}

export default MoviesCardList;