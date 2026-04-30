import type { ComponentProps } from 'react';

import { cn } from '@/lib';

export type StyledTextPreviewProps = ComponentProps<'div'> & {
  text: string;
};
export const StyledTextPreview = ({ text, className, ...props }: StyledTextPreviewProps) => (
  <div
    {...props}
    className={cn(className, 'styled-text-preview typo-body-lg')}
    // biome-ignore lint/security/noDangerouslySetInnerHtml: temporary bypass
    dangerouslySetInnerHTML={{ __html: text }}
  />
);
