import fs from 'node:fs/promises';
import path from 'node:path';

import { StyledTextPreview } from '@ergo-raffle/ui-kit';

import { markdownToHtml } from '@/lib';

const TermsPage = async () => {
  const filePath = path.join(process.cwd(), 'public', 'docs', 'privacy-notice.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <StyledTextPreview className="prose prose-neutral max-w-none" text={markdownToHtml(content)} />
  );
};
export default TermsPage;
