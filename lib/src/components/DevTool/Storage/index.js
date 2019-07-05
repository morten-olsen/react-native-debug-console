import React from 'react';
import styled from 'styled-components/native';
import Storage from '../../data/Storage';
import State from '../../data/State';
import Toolbar, {
  Button,
  Seperator,
} from '../../base/Toolbar';
import Keys from './Keys';
import Value from './Value';

const Wrapper = styled.View`
  flex: 1;
`;

const StorageView = ({
  provider,
}) => (
  <State>
    {({ selected }, setState) => (
      <Storage provider={provider}>
        {(data, update, removeItem, clear) => (
          <Wrapper>
            <Toolbar>
              <Seperator />
              <Button
                name="Refresh"
                icon="reload"
                onPress={update}
              />
              <Button
                name="Clear"
                icon="trash"
                onPress={clear}
              />
              <Button
                name="Delete"
                icon="remove"
                disabled={!selected}
                onPress={() => removeItem(selected)}
              />
            </Toolbar>
            <Keys
              selected={selected}
              onSelect={(key) => setState({ selected: key })}
              keys={Object.keys(data)}
            />
            {selected && data[selected] && (
              <Value value={data[selected]} />
            )}
          </Wrapper>
        )}
      </Storage>
    )}
  </State>
);

export default StorageView;
