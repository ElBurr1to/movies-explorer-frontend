import { NavLink } from 'react-router-dom';

import './AuthorizationBar.css';

function AuthorizationBar(props) {
  return (
    <nav className='authorization-bar'>
      <ul className='authorization-bar__list'>
        <li className="authorization-bar__item"><NavLink to='/signup' className='authorization-bar__link'>Регистрация</NavLink></li>
        <li className='authorization-bar__item authorization-bar__item_active'><NavLink to='/signin' className='authorization-bar__link'>Войти</NavLink></li>
      </ul>
    </nav>
  );
}

export default AuthorizationBar;