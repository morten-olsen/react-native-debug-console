const path = require('path');
const blacklist = require('metro/src/blacklist');

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '../lib')];
  },
  getProvidesModuleNodeModules() {
    return [
      'react-native',
      'react',
      'prop-types',
      'styled-components',
      'react-native-json-tree',
    ];
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '../lib', 'node_modules'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, 'node_modules/xdl'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, 'node_modules/react-google-maps'))}\\/.*$`
      ),
    ]);
  },
};