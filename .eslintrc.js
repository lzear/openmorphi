module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'prettier/prettier': 'error',
    '@typescript-eslint/ban-ts-ignore': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    //   'react-hooks/exhaustive-deps': 0,
    //   ' @typescript-eslint/explicit-function-return-type': 0,
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
    {
      files: ['**/*.jsx', '**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 2,
      },
    },
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react-app'],
};
