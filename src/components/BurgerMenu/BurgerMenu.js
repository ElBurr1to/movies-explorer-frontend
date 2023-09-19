import React from 'react';
import './BurgerMenu.css';
import Navigation from '../Navigation/Navigation'
import ProfileLink from '../ProfileLink/ProfileLink';

function BurgerMenu(props) {
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);

  function handleBurgerClick() {
    setBurgerOpen(!isBurgerOpen);
  }


  return (
    <div className='burger-menu'>
      <div className='burger-menu__button' onClick={handleBurgerClick}>
        <div className='burger-menu__line'></div>
        <div className='burger-menu__line'></div>
        <div className='burger-menu__line'></div>
      </div>
      <div className='burger-menu__cover'>
      </div>
      <div className={`burger-menu__side-menu ${isBurgerOpen ? 'burger-menu__side-menu_active' : ''}`}>
        <button className='burger-menu__close-btn' onClick={handleBurgerClick}></button>
        <div className='burger-menu__navigation'>
          <Navigation type='burger' className='burger-menu__navigation'/>
        </div>
        <div className='burger-menu__profile-link'>
          <ProfileLink type='burger'></ProfileLink>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;