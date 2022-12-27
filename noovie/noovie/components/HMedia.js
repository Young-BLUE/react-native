import React from 'react';
import styled from 'styled-components/native';
import Poster from "./Poster";
import Votes from "./Votes";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";

const HMovie = styled.View`
  padding: 0px 25px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 5px;
`;

const HMedia = ({id, posterPath, originalTitle, releaseDate, overview, voteAverage, fullData}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail", params: {
                ...fullData,
            }
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <HMovie key={id}>
                <Poster path={posterPath}/>
                <HColumn>
                    <Title>
                        {originalTitle.length > 30
                            ? `${originalTitle.slice(0, 30)}...`
                            : originalTitle}
                    </Title>
                    {releaseDate ? (
                        <Release>
                            {new Date(releaseDate).toLocaleDateString("ko")}
                        </Release>
                    ) : null}
                    {voteAverage ? <Votes vote_average={voteAverage}/> : null}
                    <Overview>
                        {overview !== "" && overview.length > 150
                            ? `${overview.slice(0, 150)}...`
                            : overview}
                    </Overview>
                </HColumn>
            </HMovie>
        </TouchableOpacity>
    )
}

export default HMedia;