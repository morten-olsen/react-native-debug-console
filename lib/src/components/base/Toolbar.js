import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';
import {
  Body,
} from './text';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 0 10px;
`;

const Item = styled.TouchableOpacity`
  padding: 10px 10px;
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
`

const Toolbar = ({
  items = [],
}) => (
  <Wrapper>
    {items.map(({
      name,
      icon,
      onPress,
      disabled,
    }) => (
      <Item
        key={name}
        onPress={disabled ?  undefined : onPress}
        disabled={disabled}
      >
        {icon ? (
          <Icon name={icon} />
        ) : (
          <Body color={disabled ? '#ccc' : undefined}>{name}</Body>
        )}
      </Item>
    ))}
  </Wrapper>
)

export default Toolbar;