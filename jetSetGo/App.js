import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import { Image } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLogged(true)
    }
  };

  useEffect(() => {
    checkAuthentication();
    let timer1 = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Image
          source={require("./assets/loader.gif")}
          style={{
            width: 450,
            height: 450,
            resizeMode: "cover",
            backgroundColor: "#fff"
          }}
        ></Image>
      ) : (
        isLogged ? <AppStack /> : <AuthStack />
      )
      }
    </NavigationContainer >
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
};

export default App;
