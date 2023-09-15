import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Container from '../Container/Container';

function SearchForm(props) {
  return (
    <section className='search-form'>
      <Container>
        <div className='search-form__content'>
          <form name='film-search' className='search-form__form'>
            <div className='search-form__bar'>
              <input type='text' id='film' name='film' className='search-form__input' placeholder='Фильм' aria-label="Фильм" required />
              <button type='submit' className='search-form__submit-btn' aria-label='Найти'>Найти</button>
              <div className='search-form__checkbox search-form__checkbox_type_desktop'>
                <FilterCheckbox name='isShortFilms'></FilterCheckbox>
                <label for='isShortFilms' className='search-form__checkbox-label'>Короткометражки</label>
              </div>
            </div>
            <div className='search-form__checkbox search-form__checkbox_type_mobile'>
                <FilterCheckbox name='isShortFilms'></FilterCheckbox>
                <label for='isShortFilms' className='search-form__checkbox-label'>Короткометражки</label>
              </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default SearchForm;