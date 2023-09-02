module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', { code: 80, ignorePatter: '^import\\s.+\\sfrom\\s.+;$' }],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'double'],
  },
};
