// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt([
  {
    name: 'app/ignores',
    ignores: [
      'node_modules',
      '.vscode',
      '.idea',
      'dist',
      'public',
      'docs',
      '.husky',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      '**/*.json',
      '**/*.md',
    ],
  },
  {
    name: 'app/files',
    files: ['**/*.{js,ts,vue,json,md}'],
    rules: {
      // Add any app-specific rules here
    },
  },

  // 👇 Cấu hình Prettier – phải đặt CUỐI CÙNG để override các rule xung đột
  {
    name: 'prettier-override',
    files: ['**/*.{js,ts,vue,json,md}'],
    rules: eslintConfigPrettier.rules,
  },
]);
