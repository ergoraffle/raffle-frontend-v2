import type { ComponentProps } from 'react';

import { DotMenuHorizontal, Left, Right } from '@ergo-raffle/icons';

import { cn } from '@/lib/utils';
import { type AnchorProps, useFramework } from '@/providers';

import { Button } from './Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select';
import { Typography } from './Typography';

type PaginationWrapperProps = ComponentProps<'nav'>;

const PaginationWrapper = ({ className, ...props }: PaginationWrapperProps) => (
  <nav
    aria-label="pagination"
    data-slot="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);

type PaginationContentProps = ComponentProps<'ul'>;

const PaginationContent = ({ className, ...props }: PaginationContentProps) => (
  <ul
    data-slot="pagination-content"
    className={cn('gap-0.5 flex items-center', className)}
    {...props}
  />
);

type PaginationItemProps = ComponentProps<'li'>;

const PaginationItem = ({ ...props }: PaginationItemProps) => (
  <li data-slot="pagination-item" {...props} />
);

type PaginationLinkProps = {
  isActive?: boolean;
} & AnchorProps;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => {
  const Link = useFramework().components.Anchor;
  return (
    <Button
      asChild
      variant="plain"
      size="icon-xs"
      className={cn('aria-disabled:opacity-50 aria-disabled:pointer-events-none', className)}
    >
      <Link
        aria-current={isActive ? 'page' : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
};

type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

const PaginationPrevious = ({ className, ...props }: PaginationPreviousProps) => (
  <PaginationLink aria-label="Go to previous page" className={cn(className)} {...props}>
    <Left data-icon="inline-start" className="cn-rtl-flip" />
  </PaginationLink>
);

type PaginationNextProps = ComponentProps<typeof PaginationLink>;

const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
  <PaginationLink aria-label="Go to next page" className={cn(className)} {...props}>
    <Right data-icon="inline-end" className="cn-rtl-flip" />
  </PaginationLink>
);

type PaginationEllipsisProps = ComponentProps<'span'>;

const PaginationEllipsis = ({ className, ...props }: PaginationEllipsisProps) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn(
      "size-8 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
      className
    )}
    {...props}
  >
    <DotMenuHorizontal />
  </span>
);

export type PaginationProps = ComponentProps<'div'> & {
  page: number;
  perPage: number;
  total: number;
  showChangeLimitation?: boolean;
  getPageHref: (pageNumber: number) => string;
  onChangePerPage: (perPage: number) => void;
};

export const perPageItems = [12, 24, 36, 48, 60];

export const Pagination = ({
  page,
  perPage,
  total,
  showChangeLimitation,
  getPageHref,
  onChangePerPage,
  className,
  ...props
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const pages: (number | 'ellipsis')[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages.at(-1) !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  if (totalPages <= 1) return null;

  return (
    <div {...props} className={cn('mt-4 lg:mt-9 flex items-center', className)}>
      <div className="flex-1 hidden lg:block" />
      <PaginationWrapper className="w-full lg:w-auto lg:flex-1">
        <PaginationContent className="w-full lg:w-auto justify-stretch lg:justify-start">
          <PaginationItem>
            <PaginationPrevious href={getPageHref(page - 1)} aria-disabled={page <= 1} />
          </PaginationItem>
          <li className="lg:inline-flex lg:items-center grow lg:grow-0">
            <ul className="w-full flex items-center justify-center">
              {pages.map((p) => (
                <PaginationItem key={p}>
                  {p === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={getPageHref(p)}
                      isActive={p === page}
                      aria-disabled={p === page}
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            </ul>
          </li>

          <PaginationItem>
            <PaginationNext href={getPageHref(page + 1)} aria-disabled={page >= total} />
          </PaginationItem>
        </PaginationContent>
      </PaginationWrapper>
      <div className=" items-center flex-1 gap-1 justify-end hidden lg:flex">
        {showChangeLimitation ? (
          <>
            <Typography variant="heading-5">Item per Page:</Typography>
            <div className="w-20">
              <Select
                value={perPage.toString() || '12'}
                onValueChange={(value) => onChangePerPage(Number(value))}
              >
                <SelectTrigger className="w-full max-w-48" variant="plain" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {perPageItems.map((item) => (
                      <SelectItem value={item.toString()} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
