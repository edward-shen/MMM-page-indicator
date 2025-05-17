import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import { flatConfigs as importX } from 'eslint-plugin-import-x'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { files: ['**/*.css'],
    languageOptions: { tolerant: true },
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': ['error', { available: 'newly' }],
      'css/no-important': 'off',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
        Log: 'readonly',
        MM: 'readonly',
        Module: 'readonly',
      },
    },
    plugins: { js, stylistic },
    extends: [importX.recommended, 'js/recommended', 'stylistic/recommended'],
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
    plugins: { js, stylistic },
    extends: [importX.recommended, 'js/recommended', 'stylistic/recommended'],
    rules: {
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'import-x/no-unresolved': ['error', { ignore: ['eslint/config'] }],
    },
  },
  { files: ['**/*.json'], ignores: ['package-lock.json'], plugins: { json }, extends: ['json/recommended'], language: 'json/json' },
  { files: ['**/*.md'], plugins: { markdown }, extends: ['markdown/recommended'], language: 'markdown/gfm' },
])
