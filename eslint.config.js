import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'airbnb',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Yellow squiggly instead of red
      'react/jsx-no-comment-textnodes': 'error',
      "camelcase": 'error',
      "quotes": ["warn", "double"], // Enforce double quotes
      "jsx-quotes": ["warn", "prefer-double"], // Double quotes in JSX
      "indent": ["warn", 2], // 2-space indentation
    },
  },
]);
