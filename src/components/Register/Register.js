import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '../../utils/useFormWithValidation';
import mainApi from '../../utils/MainApi';
import Logo from '../Logo/Logo';
import './Register.css';
import { AppContext } from '../../contexts/AppContext';

function Register(props) {
  const {values, handleChange, setValues, errors, isValid} = useFormWithValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const navigate = useNavigate();
  const { showPopup } = React.useContext(AppContext);

  React.useEffect(() => {
    //сброс ошибки после субмита
    setSubmitError('');
  }, [values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    mainApi.register(values.email, values.password, values.name)
      .then(res => {
        showPopup('Регистрация прошла успешно!', 'success');
        setValues({
          email: '',
          password: '',
          name: ''
        });
        //получаем токен
        mainApi.signin(values.email, values.password)
          .then(res => {
            props.onSubmit(res);
            navigate("/movies");
          })
      })
      .catch(err => {
        Promise.resolve(err)
          .then(errBody => setSubmitError(errBody.message));
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <section className='register'>
      <div className='register__content'>
        <Link to='/' className='register__logo'><Logo /></Link>
        <form name='register' className='form' onSubmit={handleSubmit}>
          <h1 className='form__title'>Добро пожаловать!</h1>
          <fieldset className='form__fieldset'>
            <label for='name' className='form__label'>Имя</label>
            <input type='text' id='name' name='name' className='form__input' aria-label='Имя' placeholder='Введите имя'  value={values['name']} onChange={handleChange} required/>
            <p className={`form__input-error ${errors['name'] ? 'form__input-error_visible' : '' }`}>{errors['name'] || 'Ошибка'}</p>
            <label for='email' className='form__label'>E-mail</label>
            <input type='email' id='email' name='email' className='form__input' aria-label='Почта' placeholder='Введите почту' value={values['email']} onChange={handleChange} required/>
            <p className={`form__input-error ${errors['email'] ? 'form__input-error_visible' : '' }`}>{errors['email'] || 'Ошибка'}</p>
            <label for='password' className='form__label'>Пароль</label>
            <input type='password' id='password' name='password' className='form__input' aria-label='Пароль' placeholder='Введите пароль' value={values['pasword']} onChange={handleChange} required/>
            <p className={`form__input-error ${errors['password'] ? 'form__input-error_visible' : '' }`}>{errors['password'] || 'Ошибка'}</p>
          </fieldset>
          <p className={`form__submit-btn-error ${submitError ? 'form__submit-btn-error_visible' : '' }`}>{submitError || 'Ошибка'}</p>
          <button type='submit' className={`form__submit-btn ${isValid ? 'form__submit-btn_active' : '' }`} aria-label='Зарегистрироваться'>{isLoading ? 'Создание профиля...' : 'Зарегистрироваться'}</button>
          <p className='form__signin-text'>Уже зарегистрированы? <Link to='/signin' className='form__link'>Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;