import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated, Image, Dimensions, StatusBar } from 'react-native';
import axios from 'axios';
import ThreeElementSwitch from '../components/ThreeElementSwitch';
import FlightItem from '../components/FlightItem';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomModal from '../components/BottomModal';
import AirlinePickerModal from '../components/AirlinePickerModal';
import Booking from '../components/Booking';

const FLIGHT_API_URL = 'https://api.npoint.io/378e02e8e732bb1ac55b';
const { height, width } = Dimensions.get('screen');

const Home = () => {
    const [flightList, setFlightList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFlightList, setSearchFlightList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState('');
    const [bookingData, setBookingData] = useState('');
    const [closeBook, setCloseBook] = useState(false);
    const [showFilter, setShowFilter] = useState('');
    const translateY = useRef(new Animated.Value(-100)).current;
    const [isError, setIsError] = useState('');
    const elements = ['List', '₹ Sort Asc', '₹ Sort Desc', 'Filter'];

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
        if (selectedElement === "List") {
            let newList = [...flightList];
            setSearchFlightList(newList);
            return;
        }
        if (selectedElement === "₹ Sort Asc") {
            sortedList.sort((a, b) => a.price - b.price);
        }
        if (selectedElement === "₹ Sort Desc") {
            sortedList.sort((a, b) => b.price - a.price);
        }
        if (selectedElement === "Filter") {
            setModalVisible(false);
            setShowFilter(true);
        }
        setSearchFlightList(sortedList);
    };

    const modalHandler = (item) => {
        setShowFilter(false);
        setModalData(item);
        setModalVisible(true);
    };

    const filterHandler = (item) => {
        let sortedList = [...flightList];
        if (item === 'Reset') {
            setSearchFlightList(sortedList);
            return;
        }
        sortedList = sortedList.filter((e) => {
            if (e.airline === item)
                return e;
        })
        setSearchFlightList(sortedList);
    };

    const handleBooking = (data) => {
        setCloseBook(true);
        setBookingData(data);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#ddeaf1' translucent={true} />
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Image
                    style={styles.titleImage}
                    source={require('../assets/appDisplay.png')}
                />
                <ThreeElementSwitch elements={elements} onSelect={handleSelect} />
            </Animated.View>
            {isLoading ? (
                <Image
                    source={require("../assets/screenLoader.gif")}
                    style={{
                        marginTop:height/4.5,
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
                        renderItem={({ item }) => <FlightItem details={item} modalHandler={modalHandler} />}
                    />
            )}
            {modalVisible === true && (
                <BottomSheetModalProvider>
                    <BottomModal
                        visible={modalVisible}
                        data={modalData}
                        onClose={() => { setModalVisible(false); }}
                        selectedBook={handleBooking}
                    />
                </BottomSheetModalProvider>
            )}
            {showFilter === true && (
                <BottomSheetModalProvider>
                    <AirlinePickerModal visible={showFilter} onClose={() => { setShowFilter(false); }} onSelect={filterHandler} />
                </BottomSheetModalProvider>
            )}
            <Booking
                visible={closeBook}
                onClose={() => setCloseBook(false)}
                data={bookingData}
            />
            {isError ? <Text style={{ color: "red", fontSize: 18, fontWeight: 300 }}>{isError}</Text> : null}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: "#fff"
    },
    titleImage: {
        marginVertical: 10,
        height: height / 11,
        alignSelf: "center",
        resizeMode: "contain",
    },
});

export default Home;
