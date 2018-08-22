import React from 'react';
import styled from 'styled-components/native';
import Button from './Button';
import Seperator from './Seperator';
import Selector from './Selector';

export {
  Button,
  Seperator,
  Selector,
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 0 10px;
`;

const Toolbar = ({
  children,
}) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default Toolbar;