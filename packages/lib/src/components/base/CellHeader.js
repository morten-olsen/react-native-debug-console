import React from 'react';
import styled from 'styled-components/native';
import {
  Emphasis,
} from './text';

const Wrapper = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const Row = ({
  children,
}) => (
  <Wrapper>
    <Emphasis>{children}:</Emphasis>
  </Wrapper>
)

export default Row;