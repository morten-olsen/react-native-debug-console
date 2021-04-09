import React, { Fragment } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import {
  Emphasis,
  Fixed,
} from '../../base/text';
import JSONTree from '../../JSON';
import Cell from '../../base/Cell';
import CellHeader from '../../base/CellHeader';
import Tab from '../Tab';

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

const Indented = styled.View`
  margin: 0 25px;
`;

const getResponse = (contentType, request) => {
  if (!contentType) {
    return null;
  }
  if (request.responseType == 'blob' || request.responseType == 'ArrayBuffer') {
    return <Emphasis>🤖 Binary</Emphasis>
  }
  const contentTypes = contentType.split(';').map(c => c.trim());

  if (contentTypes.includes('application/json')) {
    const data = JSON.parse(request.responseText);
    return <JSONTree theme={theme} data={data} />
  }

  return <Fixed selectable={true}>{request.responseText}</Fixed>;
}

let i = 0;
const Data = ({
  url,
  method,
  status,
  headers,
  requestHeaders,
  args = [],
}) => {
  const headerInfo = Object.keys(headers).map(key => `${key}: ${headers[key]}`).join('\n');
  return (
    <ScrollView>
      <View>
        <Cell left="Status" right={status} />
        <Cell left="Method" right={method} />
        <Cell left="Url" right={url} />
        <CellHeader>Response Headers</CellHeader>
        <Indented>
          <Fixed>
            {requestHeaders}
          </Fixed>
        </Indented>
        {headerInfo.length > 0 && (
          <Fragment>
            <CellHeader>Request Headers</CellHeader>
            <Indented>
              <Fixed selectable={true}>
                {headerInfo}
              </Fixed>
            </Indented>
          </Fragment>
        )}
        {args[0] && (
          <Fragment>
            <CellHeader>Request Body</CellHeader>
            <Fixed selectable={true}>{args[0].toString()}</Fixed>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

const Response = ({
  contentType,
  request,
}) => (
  <ScrollView>
    <View>
      {getResponse(contentType, request)}
    </View>
  </ScrollView>
);


const getPreview = (contentType, request, url) => {
  if (!contentType || request.responseType == 'blob' || request.responseType == 'ArrayBuffer' || !contentType) {
    return [];
  }
  const contentTypes = contentType.split(';').map(c => c.trim());

  if (contentTypes.includes('text/html')) {
    return [{
      name: 'Preview',
      view: (
        <WebView
          source={{
            html: request.responseText,
            baseUrl: url,
          }}
          style={{flex: 1}}
        />
      ),
    }]
  }
  return [];
}

const RequestDetails = (props) => (
  <Tab
    tabs={[{
      name: 'Details',
      view: <Data {...props} />
    }, {
      name: 'Response',
      view: <Response {...props} />
    }, ...getPreview(props.contentType, props.request, props.url)]}
  />
);

export default RequestDetails;
