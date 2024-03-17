import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [err, setErr] = useState('');

    const handleLogin = async () => {
        const storedData = await AsyncStorage.getItem('userDetails');
        const parsedData = JSON.parse(storedData);
        if (parsedData) {
            if (parsedData.username === username && parsedData.password === password) {
                setUsername('');
                setPassword('');
                const token = '168hedwijjdiwo832idTokenhajhsjas';
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Main', { screen: 'Home' });
            } else
                setErr("UserName or Password Incorrect !!! ");
        }
        else
            setErr("Login to continue !!! ");
    };

    const handleSignUp = async () => {
        setShowForm(true);
    };

    const handleRegister = async () => {
        setErr('');
        setUsername('');
        setPassword('');
        if (username && password && firstName) {
            const userDetails = { firstName: firstName, username: username, password: password }
            await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
            const token = '168hedwijjdiwo832idTokenhajhsjas';
            await AsyncStorage.setItem('token', token);
            setShowForm(false);
            setUsername('');
            setPassword('');
            setFirstName('');
            console.log('navigation object:', navigation);
            navigation.navigate('Main', { screen: 'Home' });
        } else {
            alert('Please enter username and password');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#ddeaf1' translucent={true} />
            <Image
                style={styles.titleImage}
                source={require('../assets/appDisplay.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: 500, textAlign: "center", color: "#1e2659", marginVertical: 10 }}>Let's elevate travel together with JetSetGO!</Text>
            {showForm === false && (
                <>
                    <TextInput
                        style={styles.touch}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername} />
                    <TextInput
                        style={styles.touch}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                </>
            )}
            {showForm === true && (
                <>
                    <TextInput
                        style={styles.touch}
                        placeholder="FirstName"
                        value={firstName}
                        onChangeText={setFirstName} />
                    <TextInput
                        style={styles.touch}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername} />
                    <TextInput
                        style={styles.touch}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                </>
            )}
            {showForm === false && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.touch, { backgroundColor: "#1e2659", width: width / 2.5 }]} title="Login" onPress={handleLogin}>
                        <Text style={{ color: "#cce8e0", fontSize: 20, fontWeight: 500 }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touch, { backgroundColor: "#1e2659", width: width / 2.5 }]} title="Login" onPress={handleSignUp}>
                        <Text style={{ color: "#cce8e0", fontSize: 20, fontWeight: 500 }}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showForm === true && (
                <TouchableOpacity style={[styles.touch, { backgroundColor: "#1e2659", width: width / 2.5, alignSelf: "center" }]} title="Login" onPress={handleRegister}>
                    <Text style={{ color: "#cce8e0", fontSize: 20, fontWeight: 500 }}>Register</Text>
                </TouchableOpacity>
            )}
            {err ? <Text style={{ color: "red", fontSize: 18, fontWeight: 300 }}>{err}</Text> : null}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 45,
        backgroundColor: '#fcfcf7',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginVertical: 20
    },
    titleImage: {
        height: height / 6,
        alignSelf: "center",
        resizeMode: "contain",
        marginVertical: 10
    },
    touch: {
        alignItems: "center",
        width: width / 1.1 - 10,
        height: height / 14,
        margin: 2,
        backgroundColor: '#ddeaf1',
        color: '#1e2659',
        padding: 15,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        marginVertical: 20
    },
});
export default LoginScreen;