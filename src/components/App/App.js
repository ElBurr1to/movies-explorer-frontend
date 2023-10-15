import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { AppContext } from '../../contexts/AppContext.js'
import mainApi from '../../utils/MainApi.js';
import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page from '../Page404/Page404';
import Profile from '../Profile/Profile';
import Popup from '../Popup/Popup.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

function App() {
  document.documentElement.setAttribute('lang', 'ru');
  const [isLogged, setIsLogged] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
    _id: '',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedLocalStorage = localStorage.getItem('isLogged');
    if (isLoggedLocalStorage === 'true') {
      mainApi.getUserInfo()
        .then(userData => {
          setCurrentUser(userData);
          setIsLogged(true);
        })
        .catch(err => {
          navigate('/');
        });
    }
  }, [isLogged]);

  function showPopup(message, type) {
    const popupList = document.querySelector('.popup__list');
    const popupElement = document.createElement('li');
    const popupMessage = document.createElement('p');
    switch(type) {
      case 'success':
        popupElement.classList.add('popup__list-item_success');
        break;
      case 'fail':
        popupElement.classList.add('popup__list-item_fail');
        break;
      default:
        break;
    }
    popupElement.classList.add('popup__list-item');
    popupMessage.classList.add('popup__message');
    popupMessage.innerHTML = message;

    popupElement.append(popupMessage);
    popupList.append(popupElement);
    popupElement.classList.add('popup__list-item_transition');


  }

  function handleSignin(values) {
    localStorage.setItem('isLogged', true);
    setCurrentUser(values);
    setIsLogged(true);
  }

  function handleProfileUpdate(values) {
    setCurrentUser(values);
  }

  function handleProfileLogout() {
    mainApi.signout()
      .then(() => {
        localStorage.removeItem('isLogged');
        setIsLogged(false);
        navigate('/');
      })
      .catch(err => {
        showPopup('При выходе из профиля произошла ошибка. Повторите позже', 'fail');
      })

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{isLogged, showPopup}}>
        <div className="page">
          <Routes>
            <Route path='/'  element={<Main />} />
            <Route path='/signin'  element={<Login onSubmit={handleSignin}/>} />
            <Route path='/signup'  element={<Register onSubmit={handleSignin}/>} />
            <Route path='/movies'  element={<ProtectedRouteElement element={Movies} isLogged={isLogged}/>} />
            <Route path='/saved-movies'  element={<ProtectedRouteElement element={SavedMovies} isLogged={isLogged}/>} />
            <Route path='/profile'  element={<ProtectedRouteElement element={Profile} onUpdate={handleProfileUpdate} onLogout={handleProfileLogout} isLogged={isLogged}/>} />
            <Route path='*'  element={<Page />} />
          </Routes>
          <Popup/>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
