import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    banner: "'use client';"
  },
  plugins: [nodeExternals(), typescript()]
};
