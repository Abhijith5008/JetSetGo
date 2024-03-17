import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const { height, width } = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';

const ThreeElementSwitch = ({ elements, onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelect = (index) => {
        setSelectedIndex(index);
        onSelect?.(elements[index]);
    };

    const handleIcon = (value) => {
        if (value === "List")
            return "list";
        if (value === "Sort Asc")
            return "sort-amount-asc";
        if (value === "Sort Desc")
            return "sort-amount-desc";
    };

    return (
        <View style={styles.container}>
            {elements.map((element, index) => (
                <TouchableOpacity
                    key={index}
                    style={[{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: index === selectedIndex ? '#1e2659' : '#ddeaf1',
                        borderColor: index === selectedIndex ? '#1e2659' : '#ddeaf1',
                        borderWidth: 1,
                        borderRadius: 25,
                        elevation: index === selectedIndex ? 10 : 0,
                        shadowColor: index === selectedIndex ? '#1e2659' : '#ddeaf1',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: index === selectedIndex ? 0.25 : 0,
                        shadowRadius: index === selectedIndex ? 4 : 0,
                    }]}
                    // Make sure the button has enough touchable area
                    onPress={() => handleSelect(index)} // Check for typos
                >
                    {index === selectedIndex ? (
                        <Animatable.View duration={300} animation="bounceInRight" easing='ease'>
                            <FontAwesome name={handleIcon(element)} size={24} color={'#ddeaf1'} />
                        </Animatable.View>
                    ) : (
                        <Animatable.View duration={300} animation="bounceInLeft" easing='ease'>
                            <Text style={styles.buttonText}>{element}</Text>
                        </Animatable.View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        zIndex: 10,
        width: width / 1.1,
        height: height / 18,
        flexDirection: 'row',
        backgroundColor: '#ddeaf1',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddeaf1',
        borderRadius: 25,
        marginBottom: 1,
    },
    buttonText: {
        color: '#1e2659',
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ThreeElementSwitch;
