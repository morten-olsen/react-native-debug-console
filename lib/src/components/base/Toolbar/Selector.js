import React, { Fragment } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import State from '../../data/State';
import Button from './Button';
import Row from '../Row';
import Icon from '../Icon';
import Modal from '../Modal';
import {
  Body,
} from '../text';

const Selector = ({
  multiSelect = false,
  onSelect,
  options = [],
  ...others
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
                key={option.name}
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