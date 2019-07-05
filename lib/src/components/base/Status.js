import React from 'react';
import styled from 'styled-components/native';
import {
  Body,
} from '../base/text';

const getColor = (code) => {
  if (code === 'Error') {
    return '#c0392b';
  }
  if (code >= 500) {
    return '#c0392b';
  }
  if (code >= 400) {
    return '#f1c40f';
  }
  if (code >= 300) {
    return '#2980b9';
  }
  return '#2ecc71';
}

const Wrapper = styled.View`
  flex-direction: row;
`;

const Icon = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: ${props => getColor(props.code)};
  margin-left: 5px;
`;

const Status = ({
  code,
}) => (
  <Wrapper>
    <Body>{code}</Body>
    {code !== 'Waiting' && <Icon code={code} />}
  </Wrapper>
)

export default Status;