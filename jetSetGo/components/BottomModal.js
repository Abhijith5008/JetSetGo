import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';

const { width, height } = Dimensions.get("window");

const BottomModal = ({ visible, data, onClose, selectedBook }) => {

    const bottomSheetRef = useRef(null);
    const getTime = (value) => moment(value).format('LT');

    const closeModal = () => {
        bottomSheetRef.current.close();
        setTimeout(() => onClose(), 100);
    };

    const handleClick = (data) => {
        selectedBook(data);
        setTimeout(() => onClose(), 100);
    };

    return (
        <BottomSheet
            handleIndicatorStyle={{ backgroundColor: "#fff" }}
            animateOnMount={true}
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            onClose={closeModal}
            backgroundStyle={{ backgroundColor: "#1e2659" }}
            containerStyle={{
                backgroundColor: "#1e2659",
                marginLeft: 10,
                marginTop: height / 1.95,
                height: height / 1.9,
                width: width / 1.04,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 15,
                elevation: 5,
            }}
            index={visible ? 0 : 1}
            snapPoints={["100%"]}
            visibility={visible ? 'visible' : 'hidden'}
        >
            <Text style={styles.header}>Flight Details</Text>
            <View
                style={{
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#ddeaf1',
                    margin: -1,
                    height: 0,
                    marginBottom: 0,
                }}>
                <View style={{ width: 60 }}></View>
            </View>
            <View style={styles.modalContent}>
                <View style={styles.dataContainer}>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>From</Text>
                        <Text style={styles.data}>{data.origin}etvfbin</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>AirCraft</Text>
                        <Text style={styles.data}>{data.aircraft}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>To</Text>
                        <Text style={styles.data}>{data.destination}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Flight</Text>
                        <Text style={styles.data}>{data.airline}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Boarding</Text>
                        <Text style={styles.data}>{getTime(data.departureTime)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Arrival</Text>
                        <Text style={styles.data}>{getTime(data.arrivalTime)}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Gate</Text>
                        <Text style={styles.data}>{data.gate}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Seats Available</Text>
                        <Text style={styles.data}>{data.seatsAvailable}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.dataTitle}>Flight No</Text>
                        <Text style={styles.data}>{data.flightNumber}</Text>
                    </View>
                </View>
                <View
                    style={{
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderColor: '#ddeaf1',
                        margin: -1,
                        height: 0,
                        marginBottom: 0,
                    }}>
                    <View style={{ width: 60 }}></View>
                </View>
                <TouchableOpacity onPress={() => handleClick(data)} style={[styles.touch, { alignSelf: "center" }]}>
                    <Text style={{ color: "#1e2659", marginTop: 3, fontSize: 20, fontWeight: 500 }}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
};


const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        width: width / 1.1,
        alignSelf: "center",
    },
    modalTitle: {
        color: '#ddeaf1',
        marginTop: 10,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header: {
        color: '#ddeaf1',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 10,
    },
    modalDesc: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10,
    },
    modalDate: {
        fontSize: 14,
        fontWeight: '300',
        position: "absolute",
        top: height / 1.5,
        alignSelf: "center"
    },
    dataContainer: {
        flexDirection: 'row',
        textAlign: "left",
        justifyContent: 'space-evenly',
    },
    row: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
        marginLeft: 30,
        marginVertical: 5,
    },
    dataTitle: {
        textAlign: "left",
        fontSize: 16,
        color: '#ddeaf1',
    },
    data: {
        fontSize: 18,
        textAlign: "left",
        color: '#fff',
        fontWeight: 'bold',
    },
    touch: {
        alignItems: "center",
        textAlign: 'center',
        width: width / 2,
        height: height / 16,
        margin: 2,
        marginTop: 12,
        backgroundColor: '#cce8e0',
        color: '#1e2659',
        padding: 7,
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
});

export default BottomModal;