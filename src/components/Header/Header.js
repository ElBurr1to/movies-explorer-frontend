import { NavLink } from 'react-router-dom';

import './Header.css';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthorizationBar from '../AuthorizationBar/AuthorizationBar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProfileLink from '../ProfileLink/ProfileLink';

function Header(props) {
  let isLogged = true;

  return (
    <header className={`header ${props.color ? 'header_' + props.color : ''}`}>
      <Container>
        <div className='header__content'>
          <NavLink to='/' className='header__logo-link'><Logo /></NavLink>
          <Navigation />
          <div className='header__profile'>
            {isLogged
              ? <ProfileLink color={props.color}/>
              : <AuthorizationBar />
            }
            <BurgerMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
