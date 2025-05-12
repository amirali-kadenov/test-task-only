/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'check-file', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: { ecmaFeatures: { jsx: true } },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'],
    curly: ['error', 'multi'],
    'func-style': ['error', 'expression'],
    'max-depth': ['error', 3],
    'max-params': ['error', 3],
    'no-else-return': ['error'],
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{ts,tsx}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'import/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
      },
    ],
  },
};
