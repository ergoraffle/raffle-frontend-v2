import fs from 'node:fs';
import path from 'node:path';

import { glob } from 'glob';

const content = glob
  .sync('**/*.svg', {
    posix: true,
    cwd: path.resolve(import.meta.dirname, 'lib')
  })
  .sort((a, b) => a.localeCompare(b))
  .flatMap((file) => {
    const componentName = path
      .basename(file, path.extname(file))
      .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());

    return [`export { default as ${componentName} } from './${file}?react';`];
  })
  .join('\n');

fs.writeFileSync(path.resolve(import.meta.dirname, 'lib', 'index.ts'), content, 'utf8');
