import React from 'react';

export const AppContext = React.createContext({
  isLogged: false,
  showPopup: () => {},
});