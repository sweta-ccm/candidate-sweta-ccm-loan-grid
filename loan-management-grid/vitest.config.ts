/// <reference types="vitest" />
 
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
 
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/helper/index.ts',
        'scripts/generate-data.ts',
        'src/stores/loanStore.ts',
        'src/main.ts',
        '**/scripts/**',
        '**/index.ts',
        'node_modules/',
        'dist/',
        '*.config.*',
        'coverage/',
      ]
    }
  },
})