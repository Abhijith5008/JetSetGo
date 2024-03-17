import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const { height, width } = Dimensions.get('screen');

const FlightItem = ({ details }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const getDate = (value) => moment(value).format('dddd MMM Do YY');
    const getTime = (value) => moment(value).format('LT');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <TouchableOpacity style={styles.viewContainer} onPress={toggleModal}>
            <View style={styles.details}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.origin}>{details.origin}</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#1e2659', marginLeft: 20, marginRight: 20 }} />
                    <View style={{ transform: [{ rotate: '90deg' }] }}>
                        <MaterialIcons name="flight" size={30} color="#1e2659" />
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#1e2659', marginLeft: 20, marginRight: 20 }} />
                    <Text style={styles.origin}>{details.destination}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.airline}>{details.airline}</Text>
                <Text style={styles.duration}>{details.duration}</Text>
                <Text style={styles.price}>₹{details.price}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.flightNumber}>Flight: {details.flightNumber}</Text>
                <Text style={styles.flightNumber}>{details.aircraft}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.date}>{getDate(details.arrivalTime)}</Text>
                <Text style={styles.date}>{getDate(details.departureTime)}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.time}>{getTime(details.arrivalTime)}</Text>
                <Text style={styles.time}>{getTime(details.departureTime)}</Text>
            </View>           
        </TouchableOpacity>
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

export default FlightItem;