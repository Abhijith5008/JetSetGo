import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated, Image, Dimensions } from 'react-native';
import axios from 'axios';
import ThreeElementSwitch from '../components/ThreeElementSwitch';
import FlightItem from '../components/FlightItem';

const FLIGHT_API_URL = 'https://api.npoint.io/378e02e8e732bb1ac55b';
const { height, width } = Dimensions.get('screen');

const Home = () => {
    const [flightList, setFlightList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFlightList, setSearchFlightList] = useState([]);
    const translateY = useRef(new Animated.Value(-100)).current;
    const [isError, setIsError] = useState('');
    const elements = ['List', 'Sort Asc', 'Sort Desc'];

    useEffect(() => {
        getFlights();
    }, []);

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [])

    const getFlights = async () => {
        try {
            const response = await axios.get(FLIGHT_API_URL);
            setFlightList(response.data);
            setSearchFlightList(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (selectedElement) => {
        let sortedList = [...searchFlightList];
        if (selectedElement === "list") {
            setSearchFlightList(flightList);
            return;
        }
        if (selectedElement === "Sort Asc") {
            sortedList.sort((a, b) => a.price - b.price);
        } else if (selectedElement === "Sort Desc") {
            sortedList.sort((a, b) => b.price - a.price);
        }
        setSearchFlightList(sortedList);
    };
    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Image
                    style={styles.titleImage}
                    source={require('../assets/filmyBg.png')}
                />
                <ThreeElementSwitch elements={elements} onSelect={handleSelect} />
            </Animated.View>
            {isLoading ? (
                <Image
                    source={require("../assets/screenLoader.gif")}
                    style={{
                        width: 250,
                        height: 250,
                        alignSelf: "center",
                        resizeMode: "contain",
                        backgroundColor: "#fff"
                    }}
                ></Image>
            ) : (
                <FlatList
                    data={searchFlightList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FlightItem details={item} />}
                />
            )}
             {isError ? <Text style={{ color: "red", fontSize: 18, fontWeight: 300 }}>{isError}</Text> : null}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        paddingVertical: 30,
        backgroundColor: "#fff"
    },
    viewContainer: {
        flex: 1,
        paddingVertical: 20,
        margin: 7,
        marginHorizontal: 10,
        backgroundColor: '#ddeaf1',
        padding: 15,
        borderRadius: 35,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },
    left: {
        marginRight: 20,
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e2659',
    },
    duration: {
        fontSize: 14,
        color: '#1e2659',
    },
    date: {
        fontSize: 17,
        fontWeight: '400',
        color: '#1e2659',
    },
    time: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1e2659',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    details: {
        marginBottom: 10,
    },
    origin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e2659',
    },
    airline: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e2659',
    },
    destination: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e2659'
    },
    flightNumber: {
        fontSize: 14,
        color: '#1e2659',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 16,
        color: '#1e2659',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    touch: {
        alignItems: "center",
        alignSelf: "center",
        margin: 2,
        width: 100,
        height: 40,
        backgroundColor: "#1e2659",
        color: '#1e2659',
        padding: 6,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },
    titleImage: {
        width: width / 2,
        height: 40,
        alignSelf: "center",
        resizeMode: "cover",
    },
});

export default Home;
