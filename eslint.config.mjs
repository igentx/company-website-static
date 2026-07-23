import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, // Ignore patterns
{
  ignores: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    'tsconfig.tsbuildinfo',
  ],
}, // Extend Next.js and TypeScript configs using compat
...compat.extends('next/core-web-vitals', 'next/typescript'), // Additional custom rules
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    // Basic rules
    'no-unused-vars': 'off', // Let TypeScript handle this
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}, // Specific overrides for content block components
{
  files: ['components/blocks/*.tsx', 'components/layout/*.tsx'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}]

export default eslintConfig
