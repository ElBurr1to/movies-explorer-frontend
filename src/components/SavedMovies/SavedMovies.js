import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <>
      <Header />
      <main>
        <section className='saved-movies'>
          <SearchForm/>
          <MoviesCardList />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;