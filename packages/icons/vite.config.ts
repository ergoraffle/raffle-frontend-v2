import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [dts({ entryRoot: './lib' }), svgr()],
  build: {
    lib: {
      entry: './lib/index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});
