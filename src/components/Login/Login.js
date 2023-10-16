import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import mainApi from '../../utils/MainApi';
import Logo from '../Logo/Logo';
import './Login.css';

function Login(props) {
  const {values, handleChange, setValues, errors, isValid} = useFormWithValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const navigate = useNavigate();
  const { isLogged } = React.useContext(AppContext);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);

  React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [])

  React.useEffect(() => {
    //сброс ошибки после субмита
    setSubmitError('');
  }, [values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsInputDisabled(true);
    setIsLoading(true);
    mainApi.signin(values.email, values.password)
      .then(res => {
        props.onSubmit(res);
        navigate('/movies');
      })
      .catch(err => {
        Promise.resolve(err)
          .then(errBody => setSubmitError(errBody.message));
      })
      .finally(() => {
        setIsInputDisabled(false);
        setIsLoading(false);
      })
  }


  return (
    <section className='login'>
      <div className='login__content'>
        <Link to='/' className='login__logo'><Logo /></Link>
        <form name='login' className='form' onSubmit={handleSubmit}>
          <h1 className='form__title'>Рады видеть!</h1>
          <fieldset className='form__fieldset'>
            <label for='email' className='form__label'>E-mail</label>
            <input type='email' id='email' name='email' className='form__input' aria-label='Почта' placeholder='Введите почту' value={values['email']} onChange={handleChange} disabled={isInputDisabled} required/>
            <p className={`form__input-error ${errors['email'] ? 'form__input-error_visible' : '' }`}>{errors['email'] || 'Ошибка'}</p>
            <label for='password' className='form__label'>Пароль</label>
            <input type='password' id='password' name='password' className='form__input' aria-label='Пароль' placeholder='Введите пароль' value={values['pasword']} onChange={handleChange} disabled={isInputDisabled} required/>
            <p className={`form__input-error ${errors['password'] ? 'form__input-error_visible' : '' }`}>{errors['password'] || 'Ошибка'}</p>
          </fieldset>
          <p className={`form__submit-btn-error ${submitError ? 'form__submit-btn-error_visible' : '' }`}>{submitError || 'Ошибка'}</p>
          <button type='submit' className={`form__submit-btn ${isValid ? 'form__submit-btn_active' : '' }`} aria-label='Зарегистрироваться' disabled={isInputDisabled} >{isLoading ? 'Выолняем вход...' : 'Войти'}</button>
          <p className='form__signin-text'>Ещё не зарегистрированы? <Link to='/signup' className='form__link'>Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;