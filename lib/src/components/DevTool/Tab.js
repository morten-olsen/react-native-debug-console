import React, { Fragment, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Icon from '../base/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 4,
    borderColor: '#2980b9',
  },
});

const Button = styled.TouchableOpacity`
  padding: 10px 20px 10px 0;
`;

const TabScroll = styled.ScrollView`
  flex: 1;
  border-right-width: 1px;
  border-color: #ccc;
  margin-right: 20px;
`;

const TabWrapper = styled.View`
  flex-direction: row;
`;

const Header = styled.View`
  flex-direction: row;
`;

const Tab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  flex: 1;
`

const Console = ({
  tabs,
  onClose,
  onDownload,
}) => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <Header>
        <TabScroll horizontal>
          <TabWrapper>
            {tabs.map(({ name }, i) => (
              <Tab
                key={name}
                style={active === i ? styles.tabActive : styles.tabInactive}
                onPress={() => {
                  setActive(i);
                }}
              >
                <Text>{name}</Text>
              </Tab>
            ))}
          </TabWrapper>
        </TabScroll>
        {onDownload && (
          <Button
            onPress={onDownload}
          >
            <Icon name="download" />
          </Button>
        )}
        {onClose && (
          <Button
            onPress={onClose}
          >
            <Icon name="close" />
          </Button>
        )}
      </Header>
      {tabs[active] && tabs[active].view}
    </View>
  );
};

Console.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};

Console.defaultProps = {
  tabs: [],
};

export default Console;
