import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

const { height, width } = Dimensions.get('screen');

const FlightItem = ({ details, modalHandler }) => {
    const getDate = (value) => moment(value).format('dddd MMM D');
    const getTime = (value) => moment(value).format('LT');

    const toggleModal = (item) => {
        modalHandler(item);
    };

    return (
        <TouchableOpacity style={styles.viewContainer} onPress={() => toggleModal(details)}>
            <View style={styles.details}>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:"space-between"}}>
                    <Text style={styles.origin}>{details.origin}</Text>
                    <Text style={styles.origin}>{details.destination}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1e2659', marginLeft: 10, marginRight: 10 }} />
                <View style={{ transform: [{ rotate: '90deg' }] }}>
                    <MaterialIcons name="flight" size={30} color="#1e2659" />
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1e2659', marginLeft: 10, marginRight: 10 }} />
            </View>
            <View style={styles.right}>
                <Text style={styles.airline}>{details.airline}</Text>
                <Text style={styles.duration}>{details.duration}</Text>
                <Text style={styles.price}>₹{details.price}</Text>
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
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e2659',
    },
    duration: {
        fontSize: 14,
        color: '#1e2659',
        marginVertical: 5
    },
    date: {
        fontSize: 17,
        fontWeight: '600',
        marginVertical: 5,
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
        marginHorizontal: 10,
        justifyContent: "space-between"
    },
    details: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    origin: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e2659',
    },
    airline: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e2659',
        marginVertical: 5
    },
    destination: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e2659'
    },
    flightNumber: {
        fontSize: 14,
        marginVertical: 5,
        color: '#1e2659',
    },
});

export default FlightItem;