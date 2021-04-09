import React from 'react';
import {
  Fixed,
} from '../base/text';

const JSONTree = ({ data }) => (
  <Fixed>
    { JSON.stringify(data, null, '  ') }
  </Fixed>
);

export default JSONTree;

