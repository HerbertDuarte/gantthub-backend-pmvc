module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "project": "./tsconfig.eslint.json"
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.eslint.json'
      }
    }
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "import/no-relative-parent-imports": "off",

    // Regras de importação
    'import/no-unresolved': 'error',
    'import/no-absolute-path': 'error',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
  },
};
