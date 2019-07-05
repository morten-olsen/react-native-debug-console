module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          //'react-native-debug-console': '../lib',
          '@babel/runtime': '../node_modules/@babel/runtime',
        }
      }]
    ]
  };
};
