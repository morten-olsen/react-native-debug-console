import React, { useState } from 'react';
import styled from 'styled-components/native';
import useStorage from '../../data/storage';
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
}) => {
  const [selected, setSelected] = useState();
  const {
    data,
    update,
    removeItem,
    clear,
  } = useStorage(provider);
  return (
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
        onSelect={(key) => {
          setSelected(key);
        }}
        keys={Object.keys(data)}
      />
      {selected && data[selected] && (
        <Value value={data[selected]} />
      )}
    </Wrapper>
  );
};

export default StorageView;
