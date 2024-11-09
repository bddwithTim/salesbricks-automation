import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import playwrightPlugin from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import { readFileSync } from 'fs';

const gitignoreContent = readFileSync('.gitignore', 'utf8');
const ignorePatterns = gitignoreContent
    .split('\n')
    .filter(Boolean)
    .filter((line) => !line.startsWith('#') && !line.startsWith('!')) // Exclude comments and negations
    .map((line) => line.trim());

export default [
    {
        ignores: ignorePatterns,
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    trailingComma: 'all',
                    printWidth: 120,
                },
            ],
        },
    },
    {
        files: ['**/*.spec.ts', '**/*.test.ts', '**/tests/**/*.ts'],
        plugins: {
            playwright: playwrightPlugin,
        },
        rules: {
            ...playwrightPlugin.configs.recommended.rules,
        },
    },
];
