const { createMetroConfiguration } = require('expo-yarn-workspaces');
const path = require('path');

//module.exports = createMetroConfiguration(__dirname);

module.exports = {
  watchFolders: [
    __dirname,
    path.join(__dirname, '..', '..', 'node_modules'),
  ]
};