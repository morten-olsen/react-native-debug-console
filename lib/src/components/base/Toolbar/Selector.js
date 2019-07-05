import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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
}) => {
  const [open, setOpen] = useState(false);
  return (
      <Fragment>
        <Button
          {...others}
          onPress={() => {
            setOpen(true);
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={!!open}
          onRequestClose={() => {
            setOpen(false);
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
                setOpen(false);
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
  );
};

export default Selector;