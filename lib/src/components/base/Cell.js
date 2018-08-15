import React from 'react';
import styled from 'styled-components/native';
import {
  Body,
  Emphasis,
} from './text';

const Wrapper = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const Left = styled.View`
  width: 100px;
`;

const Row = ({
  left,
  right,
}) => (
  <Wrapper>
    <Left>
      <Emphasis>{left}:</Emphasis>
    </Left>
    <Body>{right}</Body>
  </Wrapper>
)

export default Row;