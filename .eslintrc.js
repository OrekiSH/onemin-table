module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['**/__tests__/*.js'],
  rules: {
    'import/no-unresolved': 0,
  },
};
