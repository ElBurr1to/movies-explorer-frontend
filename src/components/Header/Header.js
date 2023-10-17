import React from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import './Header.css';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthorizationBar from '../AuthorizationBar/AuthorizationBar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProfileLink from '../ProfileLink/ProfileLink';

function Header(props) {
  const { isLogged } = React.useContext(AppContext);

  return (
    <header className={`header ${props.color ? 'header_' + props.color : ''}`}>
      <Container>
        <div className='header__content'>
          <NavLink to='/' className='header__logo-link'><Logo /></NavLink>
          <Navigation />
          <div className='header__profile'>
            {isLogged
              ? <>
                <ProfileLink color={props.color}/>
                <BurgerMenu />
                </>
              : <AuthorizationBar />
            }
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
