import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  padding: 10px;
  border-left-width: ${props => props.selected ? '10px' : '0'};
  border-color: #2980b9;
`;

const Left = styled.View`
`;

const Right = styled.View`
`;

const Center = styled.View`
  flex: 1;
  margin: 0 10px;
`;

const Row = ({
  left,
  right,
  children,
  selected,
}) => (
  <Wrapper selected={selected}>
    {left && <Left>{left}</Left>}
    <Center>{children}</Center>
    {right && <Right>{right}</Right>}
  </Wrapper>
)

export default Row;