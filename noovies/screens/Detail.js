import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import Poster from "../components/Poster";
import { makeImagePath } from "../Utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { moviesAPI, tvAPI } from "../api";
import { isLoading } from "expo-font";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 70%;
  margin-left: 20px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );
  useEffect(() => {
    setOptions({
      title: isMovie ? "Movie" : "TV Show",
    });
  }, []);
  const openYoutubeLink = async (videoId) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    await Linking.openURL(baseUrl);
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{
            uri: makeImagePath(params.backdrop_path, "w500"),
          }}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <OverView>{params.overview}</OverView>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYoutubeLink(video.key)}>
            <Ionicons name={"logo-youtube"} color={"white"} size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
