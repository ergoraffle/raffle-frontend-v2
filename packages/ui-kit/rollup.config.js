import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js'
  },
  plugins: [
    typescript(),
    postcss({
      extract: true
    })
  ],
  external: ['react', 'react-dom']
};
