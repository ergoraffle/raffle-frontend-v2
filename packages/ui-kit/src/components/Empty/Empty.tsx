import type { ComponentProps } from 'react';

import { EmptyIllustration } from './EmptyIllustration';

export type EmptyProps = ComponentProps<'div'>;

export const Empty = ({ children, ...props }: EmptyProps) => (
  <div
    data-slot="empty"
    className="flex flex-col items-center justify-center gap-4 text-gray-1"
    {...props}
  >
    <EmptyIllustration />
    <div data-slot="empty-content" className="flex flex-col items-center justify-center">
      {children}
    </div>
  </div>
);
