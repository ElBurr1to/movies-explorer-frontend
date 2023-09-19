import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoreButton from '../MoreButton/MoreButton';

function Movies(props) {
  return (
    <>
      <Header/>
      <main>
        <section className='movies'>
          <SearchForm/>
          <MoviesCardList />
          <MoreButton />
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;