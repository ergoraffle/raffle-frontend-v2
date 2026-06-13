import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    dts({ entryRoot: './lib' }),
    svgr({ svgrOptions: { expandProps: 'end' } }),
    viteStaticCopy({
      targets: [
        {
          src: 'lib/tokens/*.*',
          dest: 'tokens'
        }
      ]
    })
  ],
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
