import { marked } from 'marked';
import TurndownService from 'turndown';

import { sanitize } from './sanitize';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

turndown.addRule('strike', {
  filter: ['s', 'del'],
  replacement: (content) => `~~${content}~~`
});

turndown.addRule('underline', {
  filter: ['u'],
  replacement: (content) => `<u>${content}</u>`
});

export const htmlToMarkdown = (dirtyHtml: string) => {
  const cleanHtml = sanitize(dirtyHtml);
  return turndown.turndown(cleanHtml);
};

export const markdownToHtml = (markdown: string) => marked.parse(markdown, { async: false });
