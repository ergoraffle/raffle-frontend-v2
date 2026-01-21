'use client';

import { ExternalLink } from '@ergo-raffle/icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const identifierVariants = cva(
  'inline-flex items-center p-2 gap-2 transition-all ease-in delay-100 text-black-2 hover:text-gray-2 hover:[&_span]:underline max-w-full',
  {
    variants: {
      size: {
        md: '[&_svg]:size-3 typo-subtitle-md',
        lg: '[&_svg]:size-5 typo-subtitle-lg'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export type IdentifierProps = VariantProps<typeof identifierVariants> & {
  link?: string;
  value: string;
  className?: string;
};

export const Identifier = ({ className, value, size, link }: IdentifierProps) => (
  <div data-slot="id-holder" className={cn(identifierVariants({ size, className }))}>
    <div className="overflow-hidden inline-flex">
      <span className="text-ellipsis overflow-hidden max-w-full inline-block grow">{value}</span>
      <span className="inline-block">{(value ?? '').slice(value.length - 5, value.length)}</span>
    </div>
    {link ? (
      <a href={link}>
        <ExternalLink />
      </a>
    ) : null}
  </div>
);
