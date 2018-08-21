import React from 'react';
import styled from 'styled-components/native';

import reload from './reload.png';
import trash from './trash.png';
import remove from './return.png';
import right from './right.png';
import left from './left.png';
import play from './play.png';
import download from './download.png';
import close from './close.png';

const icons = {
  reload,
  trash,
  remove,
  right,
  left,
  play,
  download,
  close,
}

const Image = styled.Image`
  height: ${({ height }) => height || '16'}px;
  width: ${({ width }) => width || '16'}px;
`;

const Icon = ({
  name,
  width,
  height
}) => (
  <Image
    width={width}
    height={height}
    source={icons[name]}
  />
);

export default Icon;
