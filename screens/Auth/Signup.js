import axios from "axios";
import React, { useState } from "react";
import { Text, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AuthBackground from "../../assets/images/AuthBackground";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const baseUri = "http://211.38.86.92:8080";

const TestContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const View = styled.View`
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const _View = styled.View`
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: flex-start;
`;

const ErrText = styled.Text`
  color: red;
  font-size: 13px;
`;

const InputArea = styled.View`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 18%;
  padding-bottom: 6%;
`;

const EachInput = styled.View`
  align-items: center;
  width: 100%;
`;

const ButtonArea = styled.View`
  width: 100%;
  margin-bottom: 15%;
`;

export default ({ navigation }) => {
  const [nameflag, setNameflag] = useState(false);
  const [emailflag, setEmailflag] = useState(false);
  const [passwordflag, setPasswordflag] = useState(false);
  const [pwresult, setPwresult] = useState("");
  const [emresult, setEmresult] = useState("");
  const nameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const confirmPwInput = useInput("");

  const Request_Check = async (email) => {
    axios
      .get(`${baseUri}/email?email=${email}`)
      .then(function (response) {
        let res = response.request._response;
        if (res !== "true") {
          setEmresult("※ 이미 사용중인 이메일입니다.");
        } else {
          setEmresult("");
          setEmailflag(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const confirmEmail = async () => {
    console.log("checking email....");
    const { value: email } = emailInput;
    const { value: name } = nameInput;
    if (name === "") {
      Alert.alert("이름을 입력해주세요");
      return;
    } else {
      setNameflag(true);
      if (email === "") {
        setEmresult("");
      } else if (!email.includes("@dsm.hs.kr")) {
        setEmresult("※ 이메일 형식이 올바른지 확인해주세요");
      } else {
        await Request_Check(email);
      }
    }
  };

  const confirmPw = async (event) => {
    const { value: password } = passwordInput;
    let { text } = event.nativeEvent;
    if (password !== text) {
      setPwresult("※ 비밀번호를 확인해주세요");
    } else {
      if (password !== "") {
        setPwresult("");
        if (nameflag === true && emailflag === true) {
          await setPasswordflag(true);
        }
      } else {
        Alert.alert("비밀번호를 입력해주세요");
      }
    }
  };

  const handleSignup = async () => {
    const { value: name } = nameInput;
    const { value: email } = emailInput;
    const { value: password } = passwordInput;

    if (passwordflag === true) {
      await axios
        .post(`${baseUri}/signup`, {
          name: name,
          password: password,
          email: email,
        })
        .then(function (response) {
          navigation.navigate("Login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Alert.alert("회원가입을 할 수 없습니다.");
    }
  }; // Login Request

  return (
    <TestContainer>
      <View>
        <_View>
          <AuthBackground />
        </_View>
        <InputArea>
          <EachInput>
            <AuthInput
              {...nameInput}
              placeholder="이름을 입력하세요"
              keyboardType="default"
              autoCorrect={false}
              fontSize={"20px"}
              marginBottom={"20px"}
            />
            <ErrText></ErrText>
          </EachInput>
          <EachInput>
            <AuthInput
              {...emailInput}
              placeholder="e-mail을 입력하세요"
              keyboardType="email-address"
              autoCorrect={false}
              fontSize={"20px"}
              marginBottom={"20px"}
            />
            <ErrText>{emresult}</ErrText>
          </EachInput>
          <EachInput>
            <AuthInput
              {...passwordInput}
              secureTextEntry={true}
              placeholder="password을 입력하세요"
              keyboardType="default"
              autoCorrect={false}
              fontSize={"20px"}
              marginBottom={"20px"}
            />
            <ErrText></ErrText>
          </EachInput>
          <EachInput>
            <AuthInput
              {...confirmPwInput}
              secureTextEntry={true}
              placeholder="password을 확인하세요"
              keyboardType="default"
              returnKeyType="done"
              onChange={(event) => confirmPw(event)}
              autoCorrect={false}
              fontSize={"20px"}
            />
            <ErrText>{pwresult}</ErrText>
          </EachInput>
          <TouchableOpacity onPress={() => confirmEmail()}>
            <Text style={{ textAlign: "center", fontSize: 12, color: "grey" }}>
              이메일 확인하기 {emailflag === true ? "✅" : "❌"}
            </Text>
          </TouchableOpacity>
        </InputArea>
        <ButtonArea>
          <AuthButton text="Sign Up" onPress={handleSignup} />
        </ButtonArea>
      </View>
    </TestContainer>
  );
};
