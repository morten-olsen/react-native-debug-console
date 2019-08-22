import React from 'react';
import styled from 'styled-components/native';
import {
  Fixed,
} from '../../base/text';

const Scroll = styled.ScrollView`
  flex: 1;
  border-top-width: 1px;
  border-color: #ccc;
`;

const Wrapper = styled.View`
  padding: 8px 16px;
`;

const Value = ({
  value,
}) => (
  <Scroll>
    <Wrapper>
        <Fixed selectable={true}>{value}</Fixed>
    </Wrapper>
  </Scroll>
)

export default Value;