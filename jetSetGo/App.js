import React from 'react';
import Route from './Route';
import { AuthContext } from './components/AuthContext';

const App = () => {

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Route />
    </AuthContext.Provider>
  );
};

export default App;
