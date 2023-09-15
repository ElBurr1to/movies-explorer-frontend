import Container from '../Container/Container';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className='movies'>
      <Container>
        <ul className='movies__list'>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
          <li className='movies__list__item'>
            <MoviesCard></MoviesCard>
          </li>
        </ul>
      </Container>
    </section>
  );
}

export default MoviesCardList;