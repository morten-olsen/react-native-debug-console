module.exports = function (wallaby) {

  return {
    files: [
      'babel.config.js',
      'packages/**/*.js',
      '__mocks__/**/*.js',
      '!packages/**/*.spec.js',
      '!packages/demo/node_modules/**/*'
    ],

    tests: [
      'packages/lib/test/*.spec.js',
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'jest'
  };
};