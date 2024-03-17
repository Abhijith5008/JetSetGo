import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import { Image } from 'react-native';
import WelcomeScreen from './screens/welcome';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
    //AsyncStorage.removeItem('token');
    setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Image
          source={require("./assets/loader.gif")}
          style={{
            marginTop: 200,
            width: 450,
            height: 450,
            resizeMode: "cover",
            backgroundColor: "#fff"
          }}
        ></Image>
      ) : (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Main" component={MainStack} />
          <RootStack.Screen name="Login" component={LoginScreen} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
