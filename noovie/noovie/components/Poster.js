import React from 'react';
import styled from 'styled-components/native';
import { makeImagePath } from '../Utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ path }) => (
  <Image source={{ uri: makeImagePath(path, 'w500') }} />
);

export default Poster;
