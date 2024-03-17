import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get("window");

const DescriptionModal = ({ visible, data, onClose }) => {

    const bottomSheetRef = useRef(null);

    const closeModal = () => {
        bottomSheetRef.current.close();
        onClose();
    };

    return (
        <BottomSheet
            animateOnMount={true}
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            onClose={closeModal}
            backgroundStyle={{ backgroundColor: "#fcfcf7" }}
            containerStyle={{
                backgroundColor: "#fcfcf7" ,
                marginLeft: 16,
                marginTop:140,
                height:height/1.32,
                width: width / 1.1,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15,
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
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Arrival Time: {data.arrivalTime}</Text>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10, padding: 5 }} />
                <BottomSheetScrollView>
                <Text style={{ fontSize: 18, fontWeight: 500, textAlign: "center", color: "#1e2659" }}>Login to JetSetGO!</Text>
                </BottomSheetScrollView>
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
        marginTop: 10,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
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
    closeButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#333232',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
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
});

export default DescriptionModal;