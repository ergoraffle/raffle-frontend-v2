import fs from 'node:fs';
import path from 'node:path';

import { glob } from 'glob';

const lines = [];

glob
  .sync('*.svg', {
    posix: true,
    cwd: path.resolve(import.meta.dirname, 'lib')
  })
  .sort((a, b) => a.localeCompare(b))
  .forEach((file) => {
    const componentName = path
      .basename(file, path.extname(file))
      .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());

    lines.push(`export { default as ${componentName} } from './${file}?react';`);
  });

lines.push('export const TOKENS = {');

glob
  .sync('tokens/*.*', {
    posix: true,
    cwd: path.resolve(import.meta.dirname, 'lib')
  })
  .forEach((file) => {
    const filename = path.basename(file, path.extname(file));

    lines.push(`  '${filename}': new URL(/* @vite-ignore */'${file}', import.meta.url).href,`);
  });

lines.push('} as const');

const content = lines.join('\n');

fs.writeFileSync(path.resolve(import.meta.dirname, 'lib', 'index.ts'), content, 'utf8');
