import React from 'react';
import styled from 'styled-components/native';
import Poster from "./Poster";
import Votes from "./Votes";

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

const HMedia = ({id, poster_path, original_title, release_date, overview, vote_average}) => {
    return (
        <HMovie key={id}>
            <Poster path={poster_path}/>
            <HColumn>
                <Title>
                    {original_title.length > 30
                        ? `${original_title.slice(0, 30)}...`
                        : original_title}
                </Title>
                {release_date ? (
                    <Release>
                        {new Date(release_date).toLocaleDateString("ko")}
                    </Release>
                ) : null}
                {vote_average ? <Votes vote_average={vote_average} /> : null }
                <Overview>
                    {overview !== "" && overview.length > 150
                    ? `${overview.slice(0, 150)}...`
                    : overview}
                </Overview>
            </HColumn>
        </HMovie>
    )
}

export default HMedia;