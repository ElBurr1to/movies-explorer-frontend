import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import './Navigation.css';

function Navigation(props) {
  const { pathname } = useLocation();

  return (
    <nav className={`navigation ${props.type === 'burger' ? 'navigation_type_burger' : ''}`}>
      <NavLink to='/' className={`navigation__link navigation__link_hidden
                                ${pathname === '/' ? 'navigation__link_active' : ''}
                                ${props.type === 'burger' ? 'navigation__link_type_burger' : ''}`}>Главная</NavLink>
      <NavLink to='/movies' className={`navigation__link ${pathname === '/movies' ? 'navigation__link_active' : ''}
                                ${props.type === 'burger' ? 'navigation__link_type_burger' : ''}`}>Фильмы</NavLink>
      <NavLink to='/saved-movies' className={`navigation__link ${pathname === '/saved-movies' ? 'navigation__link_active' : ''}
                                ${props.type === 'burger' ? 'navigation__link_type_burger' : ''}`}>Сохраненные Фильмы</NavLink>
    </nav>
  );
}

export default Navigation;