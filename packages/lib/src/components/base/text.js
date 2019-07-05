import styled from 'styled-components/native';

export const Body = styled.Text`
  color: ${props => props.color || 'black'};
`;

export const Emphasis = styled.Text`
  font-weight: bold;
  color: ${props => props.color || 'black'};
`;

export const Fixed = styled.Text`
  font-family: Menlo-Regular;
`;