module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  plugins: ['eslint-plugin-local-rules'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'local-rules/no-console': [
      1,
      {
        allow: ['warn', 'error', 'debug'],
      },
    ],
    'local-rules/no-wx': 2,
    'local-rules/no-navigation': 2,
  },
  globals: {
    wx: true,
    getApp: true,
    App: true,
    __mpx_mode__: true,
    mpx: true,
    module: true,
    logger: true,
  },
};
