import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Keyboard, ScrollView, Text } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import PTRView from "react-native-pull-to-refresh";
import styled from "styled-components";
import AHeader from "../assets/Header/AHeader";
import THeader from "../assets/Header/THeader";
import GHeader from "../assets/Header/GHeader";
import CHeader from "../assets/Header/CHeader";
import PostBox from "../components/PostBox";
import useInput from "../hooks/useInput";
import CommentBox from "../components/CommentBox";

const baseUri = "http://211.38.86.92:8080";

const View = styled.View`
  background-color: white;
`;

const AllView = styled.View`
  flex: 1;
  height: 100%;
`;

const Comment = styled.TextInput`
  background-color: #d9d9d9;
  width: 90%;
  height: 100%;
  padding-left: 8px;
  position: absolute;
  left: 0;
`;

const Submit = styled.TouchableOpacity`
  background-color: #d9d9d9;
  height: 100%;
  width: 10%;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 0;
`;

export default ({ route, navigation }) => {
  const post = route.params;
  const [comments, setComments] = useState(null);
  const [count, setCount] = useState(0);
  const commentInput = useInput("");

  const GetToken = async () => {
    const token = await AsyncStorage.getItem("jwt");
    return token;
  };

  const GetComment = async () => {
    const token = await GetToken();
    const req_token = "Bearer " + token;

    const config = {
      headers: { Authorization: req_token },
    };

    await axios
      .get(`${baseUri}/comment/${post.timelineId}?size=30&page=0`, config)
      .then(function (response) {
        setComments(response.data.commentResponses);
        setCount(response.data.totalElements);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("데이터를 불러올수 없습니다.");
      });
  };

  const CreateComment = async () => {
    const token = await GetToken();
    const req_token = "Bearer " + token;
    const { value } = commentInput;

    commentInput.onChangeText("");
    Keyboard.dismiss();

    const config = {
      headers: { Authorization: req_token },
    };

    await axios
      .post(
        `${baseUri}/comment`,
        {
          timelineId: post.timelineId,
          content: value,
        },
        config
      )
      .then(function (response){
        GetComment();
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("댓글 작성에 실패했습니다.");
      });
  };

  useEffect(() => {
    GetComment();
  }, [count]);

  return (
    <AllView>
      <View
        style={{
          height: "13%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {post.type === "WORKER" && <AHeader />}
        {post.type === "BUYER" && <THeader />}
        {post.type === "DIVER" && <GHeader />}
        {post.type === "COMMON" && <CHeader />}
      </View>
      <View style={{ height: 190, width: "100%", backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 180,
            alignItems: "center",
          }}
        >
          <PostBox
            key={post.timelineId}
            content={post.content}
            createdAt={post.createdAt}
            isMine={post.isMine}
            name={post.name}
            timelineId={post.timelineId}
            title={post.title}
            errfunc={() => navigation.pop()}
          />
        </View>
      </View>
      <View style={{ width: "100%", height: "5%" }}>
        <View
          style={{
            backgroundColor: "#3B6978",
            width: "100%",
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>댓글</Text>
        </View>
      </View>
      <PTRView
        style={{
          width: "100%",
          height: "87%",
          backgroundColor: "white",
        }}
        onRefresh={() => {
          GetComment();
        }}
        pullHeight={60}
      >
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {count === 0 && <Text>댓글이 없습니다.</Text>}
          {count !== 0 &&
            comments &&
            comments.map((comment) => (
              <CommentBox
                postId={post.timelineId}
                setState={setCount}
                key={comment.commentId}
                commentId={comment.commentId}
                content={comment.content}
                isMine={comment.isMine}
                name={comment.name}
              />
            ))}
        </ScrollView>
      </PTRView>
      <View
        style={{ width: "100%", height: "10%", alignItems: "space-between" }}
      >
        <Comment
          post={post}
          fontSize={20}
          placeholder="댓글 입력"
          autoCorrect={false}
          {...commentInput}
          multiline={true}
        />
        <Submit onPress={() => CreateComment()}>
          <MaterialCommunityIcons
            name="comment-arrow-right-outline"
            color={"#111111"}
            size={30}
          />
        </Submit>
      </View>
    </AllView>
  );
};
