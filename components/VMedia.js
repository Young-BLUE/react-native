import React from 'react';
import styled from 'styled-components/native';
import Poster from "./Poster";
import Votes from "./Votes";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const VMedia = ({id, posterPath, originalTitle, votes}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail", params: {
                originalTitle,
            }
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <Movie key={id}>
                <Poster path={posterPath}/>
                <Title>
                    {originalTitle.slice(0, 13)}
                    {originalTitle.length > 13 ? '...' : null}
                </Title>
                <Votes vote={votes}></Votes>
            </Movie>
        </TouchableOpacity>

    )
}

export default VMedia;