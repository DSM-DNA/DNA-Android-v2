import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const default_color = "#84A9AC";
const white_color = "#ffffff";

const Touchable = styled.TouchableOpacity`
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
`;

const Container = styled.View`
  background-color: ${(props) => props.bgColor ? props.bgColor : default_color};
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 25px;
  width: 64.4%;
`;

const Text = styled.Text`
  color: ${(props) => props.bgColor ? default_color : white_color};
  text-align: center;
  font-weight: 100;
  font-size: 20px;
`;

const AuthButton = ({ text, onPress, loading = false, bgColor = null}) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text bgColor={bgColor}>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
