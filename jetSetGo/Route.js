import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import { Dimensions, Image } from 'react-native';
import WelcomeScreen from './screens/welcome';
import { AuthContext } from './components/AuthContext';

const { height } = Dimensions.get('screen');

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Route = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout();
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? (
                <Image
                    source={require("./assets/loader.gif")}
                    style={{
                        marginTop: height / 4,
                        width: 450,
                        height: 450,
                        resizeMode: "cover",
                        backgroundColor: "#fff"
                    }}
                ></Image>
            ) : (
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    {isLoggedIn ? (
                        <Stack.Screen name="Main" component={MainStack} />
                    ) : (
                        <Stack.Screen name="Login" component={LoginScreen} />
                    )}
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

export default Route;
