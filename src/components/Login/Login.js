import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Login.css';

function Login(props) {
  return (
    <section className='login'>
      <div className='login__content'>
        <Logo />
        <form name='login' className='form'>
          <h1 className='form__title'>Рады видеть!</h1>
          <fieldset className='form__fieldset'>
            <label for='email' className='form__label'>E-mail</label>
            <input type='email' id='email' name='email' className='form__input' aria-label='Почта' />
            <p className='form__input-error'>Ошибка</p>
            <label for='password' className='form__label'>Пароль</label>
            <input type='password' id='password' name='password' className='form__input' aria-label='Пароль' />
            <p className='form__input-error'>Ошибка</p>
          </fieldset>
          <button type='submit' className='form__submit-btn' aria-label='Войти'>Войти</button>
          <p className='form__signin-text'>Ещё не зарегистрированы? <Link to='/signup' className='form__link'>Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;