import React from 'react';
import styled from 'styled-components/native';
import Icon from '../Icon';
import {
  Body,
} from '../text';

const Item = styled.TouchableOpacity`
padding: 10px 10px;
opacity: ${({ disabled }) => disabled ? 0.3 : 1};
`;

const Button = ({
  name,
  icon,
  onPress,
  disabled,
}) => (
  <Item
    onPress={disabled ?  undefined : onPress}
    disabled={disabled}
  >
    {icon ? (
      <Icon name={icon} />
    ) : (
      <Body color={disabled ? '#ccc' : undefined}>{name}</Body>
    )}
  </Item>
);

export default Button;