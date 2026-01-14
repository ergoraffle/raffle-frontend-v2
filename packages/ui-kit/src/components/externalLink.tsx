'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

function ExternalLink({ className, children, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="external-link"
      className={cn(
        'flex border border-transparent rounded-md hover:border-primary-1 p-2 gap-1 transition-all ease-in delay-300',
        className
      )}
      {...props}
    >
      icon
      {children}
    </a>
  );
}

export { ExternalLink };
