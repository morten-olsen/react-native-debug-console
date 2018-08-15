import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import Status from '../../base/Status';
import Row from '../../base/Row';
import {
  Body,
} from '../../base/text';

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const TouchableOpacity = styled.TouchableOpacity`
`;

const RequestDetails = ({
  requests,
  onSelect,
  selected,
}) => (
  <ScrollView>
    <Wrapper>
      {requests.map(({
        id,
        status,
        method,
        url,
      }, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onSelect(i)}
        >
          <Row
            selected={selected === id}
            left={<Body>{method}</Body>}
            right={(
              <Status code={status} />
            )}
          >
            <Body>{url}</Body>
          </Row>
        </TouchableOpacity>
      ))}
    </Wrapper>
  </ScrollView>
);

export default RequestDetails;
