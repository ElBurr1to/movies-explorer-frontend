import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Register.css';

function Register(props) {
  return (
    <section className='register'>
      <div className='register__content'>
        <Logo />
        <form name='register' className='form'>
          <h1 className='form__title'>Добро пожаловать!</h1>
          <fieldset className='form__fieldset'>
            <label for='name' className='form__label'>Имя</label>
            <input type='text' id='name' name='name' className='form__input' aria-label='Имя' required />
            <p className='form__input-error'>Ошибка</p>
            <label for='email' className='form__label'>E-mail</label>
            <input type='email' id='email' name='email' className='form__input' aria-label='Почта' />
            <p className='form__input-error'>Ошибка</p>
            <label for='password' className='form__label'>Пароль</label>
            <input type='password' id='password' name='password' className='form__input' aria-label='Пароль' />
            <p className='form__input-error'>Ошибка</p>
          </fieldset>
          <button type='submit' className='form__submit-btn' aria-label='Зарегистрироваться'>Зарегистрироваться</button>
          <p className='form__signin-text'>Уже зарегистрированы? <Link to='/signin' className='form__link'>Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;