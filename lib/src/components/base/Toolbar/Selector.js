import React, { Fragment } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import State from '../../data/State';
import Button from './Button';
import Row from '../Row';
import Icon from '../Icon';
import {
  Body,
} from '../text';

const Modal = styled.Modal`
`;

const Selector = ({
  ...others,
  multiSelect = false,
  onSelect,
  options = [],
}) => (
  <State>
    {({ open }, setState) => (
      <Fragment>
        <Button
          {...others}
          onPress={() => {
            setState({ open: true })
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={!!open}
          onRequestClose={() => {
            setState({ open: false })
          }}
        >
          <SafeAreaView
            forceInset={{ top: 'always', vertical: 'always' }}
            style={{flex: 1}}
          >
            <Button
              name="Close"
              icon="close"
              onPress={() => {
                setState({ open: false })
              }}
            />
            {options.map((option) => (
              <TouchableOpacity
                onPress={() => {
                  if (!multiSelect) {
                    options.forEach(o => o.selected = false);
                  }
                  option.selected = !option.selected
                  onSelect(options);
                }}
              >
                <Row
                  left={(
                    <Icon name={option.selected ? 'check' : 'square'} />
                  )}
                >
                  <Body>{option.name}</Body>
                </Row>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </Modal>
      </Fragment>
    )}
  </State>
);

export default Selector;