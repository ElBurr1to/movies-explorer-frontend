import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page from '../Page404/Page404';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='/'  element={<Main />} />
        <Route path='/movies'  element={<Movies />} />
        <Route path='/saved-movies'  element={<SavedMovies />} />
        <Route path='/profile'  element={<Profile />} />
        <Route path='/signin'  element={<Login />} />
        <Route path='/signup'  element={<Register />} />
        <Route path='*'  element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
