import React, { useEffect, useState } from 'react';
import Route from './Route';
import { AuthContext } from './components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
    AsyncStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Route />
    </AuthContext.Provider>
  );
};

export default App;
