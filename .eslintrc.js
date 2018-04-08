module.exports = {
  extends: ['eslint:recommended', 'airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
    },
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    jquery: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': ['off'],
    'func-names': 0,
    'no-console': 0
  },
  globals: {
    Hubs: false,
    production: false,
  },
  plugins: ['eslint-plugin-html'],
};
