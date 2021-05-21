import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import LogoutBack from "../../assets/images/LogoutBack";
import { useLogOut } from "../../AuthContext";

const baseUri = "http://211.38.86.92:8080";

const Image = styled.View`
  width: 68%;
  height: 61%;
  background-color: white;
`;

const Touchable = styled.TouchableOpacity`
  padding-top: 5px;
  align-items: center;
  width: 100%;
`;

const Container = styled.View`
  background-color: black;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 25px;
  width: 60%;
`;

const _Container = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 25px;
  width: 98%;
`;

const Text = styled.Text`
  color: black;
  text-align: center;
  font-weight: 200;
  font-size: 22px;
`;

export default () => {
  const logOut = useLogOut();

  const GetToken = async () => {
    const token = await AsyncStorage.getItem("jwt");
    return token;
  };

  const Logout = async () => {
    const token = GetToken();
    axios
      .get(`${baseUri}/logout?${token}`)
      .catch(function (error) {
        console.log(error);
      });
    logOut();
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          height: "60%",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <Image>
          <LogoutBack />
        </Image>
      </View>
      <View style={{ width: "100%", height: "38%", backgroundColor: "white" }}>
        <Touchable onPress={() => Logout()}>
          <Container>
            <_Container>
              <Text>로그아웃 하기!</Text>
            </_Container>
          </Container>
        </Touchable>
      </View>
      <Text style={{fontSize:11, color:"grey"}}>Beta 1.6</Text>
    </View>
  );
};
