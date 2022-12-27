import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Poster from "../components/Poster";
import { makeImagePath } from "../Utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { moviesAPI, tvAPI } from "../api";

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

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ["movies", params.id],
    moviesAPI.detail,
    {
      enabled: "original_title" in params,
    }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ["tv", params.id],
    tvAPI.detail,
    {
      enabled: "original_name" in params,
    }
  );
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
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
      <OverView>{params.overview}</OverView>
    </Container>
  );
};

export default Detail;
