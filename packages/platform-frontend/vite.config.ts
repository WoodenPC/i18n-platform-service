import { defineConfig } from 'vite'
//@ts-ignore
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@entities': path.resolve(__dirname, "./src/entities"),
      '@app': path.resolve(__dirname, "./src/app"),
      '@features': path.resolve(__dirname, "./src/features"),
      '@pages':  path.resolve(__dirname, "./src/pages"),
      '@shared': path.resolve(__dirname, "./src/shared"),
    }
  }
})
