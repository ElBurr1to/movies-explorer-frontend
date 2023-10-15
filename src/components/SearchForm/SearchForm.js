import React from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Container from '../Container/Container';

function SearchForm(props) {
  const [values, setValues ] = React.useState(props.values || {
    film: '',
    isShortFilms: false,
  });

  function handleFilmChange(evt) {
    setValues({...values, film: evt.target.value});
    if (props.onMovieInputChange) {
      props.onMovieInputChange({
        film: evt.target.value,
        isShortFilms: values.isShortFilms,
      });
    }
  }

  function handleIsShortFilmsChange(evt) {
    setValues({...values, isShortFilms: !values.isShortFilms});
    props.onShortMoviesFilterClick({...values, isShortFilms: !values.isShortFilms});
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(values);
  }

  return (
    <section className='search-form'>
      <Container>
        <div className='search-form__content'>
          <form name='film-search' className='search-form__form' onSubmit={handleSubmit}>
            <div className='search-form__bar'>
              <input type='text' id='film' name='film' className='search-form__input' value={values['film']} placeholder='Фильм' aria-label="Фильм" onChange={handleFilmChange} required />
              <button type='submit' className='search-form__submit-btn' aria-label='Найти'>Найти</button>
              <div className='search-form__checkbox search-form__checkbox_type_desktop'>
                <FilterCheckbox name='isShortFilms' id='isShortFilms' value={values['isShortFilms']} onChange={handleIsShortFilmsChange} />
                <label for='isShortFilms' className='search-form__checkbox-label'>Короткометражки</label>
              </div>
            </div>
            <div className='search-form__checkbox search-form__checkbox_type_mobile'>
                <FilterCheckbox name='isShortFilms' id='isShortFilms-mobile' value={values['isShortFilms']} onChange={handleIsShortFilmsChange} />
                <label for='isShortFilms' className='search-form__checkbox-label'>Короткометражки</label>
              </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default SearchForm;