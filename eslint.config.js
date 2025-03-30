import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': pluginQuery,
    },
    parserOptions: {
      project: './tsconfig.app.json',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      "import/no-unresolved": "off",
      "import/order": ["error", {
        "groups": [
          // Imports of builtins are first
          "builtin",
          // Then sibling and parent imports. They can be mingled together
          ["sibling", "parent"],
          // Then index file imports
          "index",
          // Then any arcane TypeScript imports
          "object",
          // Then the omitted imports: internal, external, type, unknown
        ],
        "newlines-between": "always",
      }],
    },
  },
)
