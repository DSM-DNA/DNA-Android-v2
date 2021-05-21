import React from "react";
import { StyleSheet, View } from 'react-native';
import GlobeSvg from "../../assets/images/globe.js";
import AuthButton from "../../components/AuthButton.js";

export default ({ navigation }) => (
    <>
        <View style={Container.Img}>
            <GlobeSvg />
        </View>
        <View style={Container.Button}>
            <AuthButton
                text={"Sign In"}
                onPress={() => navigation.navigate("Login")}
            />
            <AuthButton
                text={"Sign Up"}
                bgColor={"#ffffff"}
                onPress={() => navigation.navigate("Signup")}
            />
        </View>
    </>
);

const Container = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        width: '100%',
        color: 'white',
        backgroundColor: '#204051'
    },
    Img: {
        paddingTop: '20.9%',
        width: '80%',
    },
    Button: {
        alignItems: "center",
        marginTop: '37.9%',
        width: '100%',
    }
});