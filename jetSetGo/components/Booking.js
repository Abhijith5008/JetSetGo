import moment from 'moment';
import React, { useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get("window");

const Booking = ({ visible, onClose, data }) => {
    const updateRef = useRef(null);
    const closeUpdateModalRef = useRef(null);
    const getDate = (value) => moment(value).format('dddd MMM D');
    const getTime = (value) => moment(value).format('LT');

    const handleSave = () => {
        if (updateRef.current) {
            updateRef.current?.animate('bounceOutDown', 500, 0, 'ease-out');
            closeUpdateModalRef.current?.animate('zoomOutDown', 300, 0, 'ease-out');
            setTimeout(function () { onClose() }, 100);
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Animatable.View
                animation="bounceInLeft"
                duration={800}
                easing={'ease-in'}
                ref={closeUpdateModalRef}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Booking Successful for {data.airline}</Text>
                    <View
                        style={{
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            borderColor: '#1e2659',
                            margin: -1,
                            height: 0,
                            marginBottom: 0,
                        }}>
                        <View style={{ width: 60 }}></View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.row}>
                            <Text style={styles.dataTitle}>From</Text>
                            <Text style={styles.data}>{data.origin}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.dataTitle}>To</Text>
                            <Text style={styles.data}>{data.destination}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.row}>
                            <Text style={styles.dataTitle}>At</Text>
                            <Text style={styles.data}>{getDate(data.arrivalTime)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.dataTitle}>Date</Text>
                            <Text style={styles.data}>{getTime(data.arrivalTime)}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[{ backgroundColor: '#1e2659' }, styles.button]} onPress={handleSave}>
                            <Animatable.View ref={updateRef}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </Modal >
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        height: height / 3,
        width: width / 1.1,
        backgroundColor: '#ddeaf1',
        padding: 20,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e2659',
        marginBottom: 10,
    },
    timeTitle: {
        fontSize: 14,
        fontWeight: '300',
        alignSelf: "center"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    closeButtonText: {
        color: '#fcfcf7',
        fontWeight: '900',
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dataContainer: {
        flexDirection: 'row',
        marginVertical: 6,
        textAlign: "left",
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
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
        color: '#1e2659',
    },
    data: {
        fontSize: 18,
        textAlign: "left",
        color: '#1e2659',
        fontWeight: 'bold',
    },
});
export default Booking;