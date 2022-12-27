import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = ({vote}) => {
    return (
        <Text>
            {vote > 0
                ? `⭐️ ${vote.toFixed(1)}/10`
                : `Coming soon`}
        </Text>);
}

export default Votes;