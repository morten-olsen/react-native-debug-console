import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import JSONTree from 'react-native-json-tree';
import {
  ScrollView
} from 'react-native';
import {
  Body,
  Emphasis,
  Fixed,
} from '../../base/text';

const theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};

const Wrapper = styled.View``;
const List = styled.View`
  padding-left: 10px;
  border-left-width: 10px;
  border-color: ${props => props.color || 'black' }
`;
const Row = styled.View`
  margin: 10px;
`;

const getColor = (type) => {
  if (type === 'error') {
    return 'red';
  }
  if (type === 'warn') {
    return 'yellow';
  }
  if (type === 'verbose') {
    return 'gray';
  }
  return;
}

const formatData = (data, options) => {
  const {
    includeStackTrace
  } = options;
  if (typeof data === 'undefined') {
    return <Fixed>undefined</Fixed>;
  }
  if (data instanceof Error) {
    if (includeStackTrace) {
      return (
        <JSONTree
          theme={theme}
          data={{
            message: data.toString(),
            stackTrace: data.stack.toString(),
          }}
        />
      );
    } else {
      return <Fixed>{data.toString()}</Fixed>;
    }
  }
  if (typeof data === 'object') {
    return <JSONTree data={data} />
  }
  return <Fixed>{data.toString()}</Fixed>;
}

const OutputList = ({
  items,
  color,
  includeStackTrace,
}) => (
  <List color={color}>
    {items.map((data, i) => (
      <Fragment key={i}>
        {formatData(data, {
          includeStackTrace,
        })}
      </Fragment>
    ))}
  </List>
)

const Console = ({
  logs,
  includeStackTrace,
}) => (
  <ScrollView
    ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }}
  >
    <Wrapper>
      {logs.map((log, i) => (
        <Row key={i}>
          <Emphasis color={getColor(log.type)}>
            {log.type}
          </Emphasis>
          <OutputList
            items={log.data}
            includeStackTrace={includeStackTrace}
            color={getColor(log.type)}
          />
        </Row>
      ))}
    </Wrapper>
  </ScrollView>
);

export default Console;
