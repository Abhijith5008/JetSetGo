import React from "react";
import {
    ImageBackground,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const WelcomeScreen = ({ navigation }) => {

    const initiateRec = () => {
        navigation.navigate("Home");
    };

    return (
        <>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#ddeaf1' translucent={true} />
            <ImageBackground
                style={{ flex: 1 }}
                source={require("../assets/screen.jpg")}
            >
                <View
                    style={{
                        position: "absolute",
                        height: "100%",
                        zIndex: 2,
                        width: "100%",
                        justifyContent: "flex-end",
                        paddingHorizontal: 10 * 2,
                        paddingBottom: 10 * 5,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: "900",
                                fontSize: 10 * 4.5,
                                textTransform: "capitalize",
                            }}
                        >
                            Let's elevate travel together!
                        </Text>
                        <TouchableOpacity
                            style={{
                                padding: 10 * 2,
                                backgroundColor: '#fff',
                                borderRadius: 10 * 2,
                                alignItems: "center",
                                marginTop: 10 * 3,
                            }}
                            onPress={initiateRec}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 10 * 2,
                                    fontWeight: "700",
                                }}
                            >
                                Explore Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

export default WelcomeScreen;
