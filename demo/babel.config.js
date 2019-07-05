module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [require.resolve('babel-plugin-module-resolver'), {
        alias: {
          '@babel/runtime': '../node_modules/@babel/runtime',
        }
      }]
    ]
  };
};
