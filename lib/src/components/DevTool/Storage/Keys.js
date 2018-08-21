import React from 'react';
import styled from 'styled-components/native';
import Row from '../../base/Row';
import {
  Body,
} from '../../base/text';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Wrapper = styled.View`
`;

const Button = styled.TouchableOpacity`
`;

const Keys = ({
  keys,
  selected,
  onSelect,
}) => (
  <Scroll>
    <Wrapper>
      {keys.map(key => (
        <Button
          key={key}
          onPress={() => onSelect(key)}
        >
          <Row
            selected={selected === key}
          >
            <Body>{key}</Body>
          </Row>
        </Button>
      ))}
    </Wrapper>
  </Scroll>
)

export default Keys;