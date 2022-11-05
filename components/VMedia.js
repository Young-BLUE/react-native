import React from 'react';
import styled from 'styled-components/native';
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const VMedia = ({id, poster_path, original_title, votes}) => {
    return (
        <Movie key={id}>
            <Poster path={poster_path}/>
            <Title>
                {original_title.slice(0, 13)}
                {original_title.length > 13 ? '...' : null}
            </Title>
            <Votes vote={votes}></Votes>
        </Movie>
    )
}

export default VMedia;