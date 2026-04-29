import DOMPurify from 'dompurify';

export const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'strong', 'em', 'ul', 'ol', 'li', 'a', 's', 'u', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload']
  });
