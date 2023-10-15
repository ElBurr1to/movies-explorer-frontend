import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import './Profile.css';
import Header from '../Header/Header';
import { AppContext } from '../../contexts/AppContext';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues, errors, isValid, setIsValid} = useFormWithValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRedacting, setIsRedacting] = React.useState(false);
  const { showPopup } = React.useContext(AppContext);


  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values.name, values.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    mainApi.setUserInfo(values.name, values.email)
      .then(res => {
        props.onUpdate(values);
        showPopup('Изменения сохранены!', 'success');
      })
      .catch(err => {
        Promise.resolve(err)
          .then(errBody => showPopup(errBody.message, 'fail'));
      })
      .finally(() => {
        setIsLoading(false);
        onRedacting(false);
      })
  }

  function onRedacting(flag) {
    setIsRedacting(flag);
  }

  function onChange(event) {
    handleChange(event);

  }

  return (
    <>
    <Header />
    <section className='profile'>
      <form name='profile' className='profile__form' onSubmit={handleSubmit}>
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <fieldset className='profile__fieldset'>
            <label for='name' className={`profile__label ${errors['name']  ? 'profile__label_invalid' : '' }`}>
              Имя
              <input type='text' id='name' name='name' className={`profile__input ${errors['name']  ? 'profile__input_invalid' : '' }`} aria-label='Имя' value={values['name']} onChange={onChange} placeholder='Введите имя' disabled={!isRedacting}/>
            </label>
            <label for='email' className={`profile__label ${errors['email']  ? 'profile__label_invalid' : '' }`}>
              E-mail
              <input type='email' id='email' name='email' className={`profile__input ${errors['email']  ? 'profile__input_invalid' : '' }`} aria-label='E-mail' value={values['email']} onChange={onChange} placeholder='Введите почту' disabled={!isRedacting}/>
            </label>
          </fieldset>
          {isRedacting
            ? <>
                <p className={`form__submit-btn-error ${errors['name'] || errors['email'] ? 'form__submit-btn-error_visible' : '' }`}>{errors['name'] || errors['email'] || 'Ошибка'}</p>
                <button type='submit' className={`profile__submit-btn ${isValid ? 'profile__submit-btn_active' : '' }`} aria-label='Сохранить'>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
              </>
            : <>
                <button type='button' className='profile__button' aria-label='Редактировать' onClick={onRedacting}>Редактировать</button>
                <button type='button' className='profile__button profile__button_type_exit' aria-label='Выйти' onClick={props.onLogout}>Выйти из аккаунта</button>
              </>
          }
          </form>
    </section>
    </>
  );
}

export default Profile;