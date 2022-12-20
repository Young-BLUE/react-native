import {BlurView} from 'expo-blur';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import styled from 'styled-components/native';
import {makeImagePath} from '../Utils';
import Poster from './Poster';
import {useNavigation} from "@react-navigation/native";

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
                   backdropPath,
                   posterPath,
                   originalTitle,
                   voteAverage,
                   overview,
               }) => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail", params: {
                originalTitle,
            }
        });
    }
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{flex: 1}}>
                <BgImg
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImagePath(backdropPath, 'w500')}}
                />
                <BlurView
                    tint={isDark ? 'dark' : 'light'}
                    intensity={50}
                    style={StyleSheet.absoluteFill}
                >
                    <Wrapper>
                        <Poster path={posterPath}/>
                        <Column>
                            <Title isDark={isDark}>{originalTitle}</Title>
                            {voteAverage > 0 ? (
                                <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes>
                            ) : null}
                            <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Slide;
