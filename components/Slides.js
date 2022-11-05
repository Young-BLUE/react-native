import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import React from 'react';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import styled from 'styled-components/native';
import { makeImagePath } from '../Utils';
import Poster from './Poster';

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdrop_path, 'w500') }}
      />
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        intensity={50}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 0 ? (
              <Votes isDark={isDark}>⭐️{vote_average}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
