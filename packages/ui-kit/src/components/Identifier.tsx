'use client';

import { ExternalLink } from '@ergo-raffle/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ergo-raffle/ui-kit';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const identifierVariants = cva(
  'inline-flex items-center transition-all ease-in delay-100 text-black-2 hover:text-gray-2 hover:[&_span]:border-b-1 max-w-full',
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
  href?: string;
  value: string;
  className?: string;
  trailingLength?: number;
};

export const Identifier = ({
  className,
  value,
  size,
  href,
  trailingLength = 5
}: IdentifierProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div data-slot="identifier" className={cn(identifierVariants({ size, className }))}>
        <div className="overflow-hidden inline-flex grow">
          <span className="shrink min-w-0 text-nowrap overflow-hidden text-ellipsis">
            {(value ?? '').slice(0, -trailingLength)}
          </span>
          <span className="shrink-0">{(value ?? '').slice(-trailingLength)}</span>
        </div>
        {href ? (
          <a href={href} target="_blank">
            <ExternalLink />
          </a>
        ) : null}
      </div>
    </TooltipTrigger>
    <TooltipContent>{value}</TooltipContent>
  </Tooltip>
);
