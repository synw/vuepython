import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript2 from "rollup-plugin-typescript2"
const path = require('path')

export default defineConfig({
  plugins: [
    typescript2({
      check: false,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      clean: true
    }),
    vue(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'vuepy'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})