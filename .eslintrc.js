module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 2,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
    'react/prop-types': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    //   //   'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    //   'import/resolver': {
    //     node: {
    //       extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    //     },
    //   },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  plugins: ['@typescript-eslint', 'prettier'],
}
