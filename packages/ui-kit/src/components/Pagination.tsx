import type { ComponentProps } from 'react';

import { DotMenuHorizontal, Left, Right } from '@ergo-raffle/icons';

import { cn } from '@/lib/utils';
import { type AnchorProps, useFramework } from '@/providers';

import { Button, type ButtonProps } from './Button';
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
    className={cn('mx-auto flex w-full', className)}
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
  onChangePage?: never;
} & AnchorProps;

type PaginationButtonProps = {
  isActive?: boolean;
} & ButtonProps;

type PaginationTriggerProps = PaginationLinkProps | PaginationButtonProps;

const PaginationTrigger = ({ className, isActive, ...props }: PaginationTriggerProps) => {
  const Link = useFramework().components.Anchor;
  if ('href' in props) {
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
  }
  return (
    <Button
      variant="plain"
      size="icon-xs"
      className={cn('aria-disabled:opacity-50 aria-disabled:pointer-events-none', className)}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  );
};

const PaginationPrevious = ({ className, ...props }: PaginationTriggerProps) => (
  <PaginationTrigger aria-label="Go to previous page" className={cn(className)} {...props}>
    <Left data-icon="inline-start" className="cn-rtl-flip" />
  </PaginationTrigger>
);

const PaginationNext = ({ className, ...props }: PaginationTriggerProps) => (
  <PaginationTrigger aria-label="Go to next page" className={cn(className)} {...props}>
    <Right data-icon="inline-end" className="cn-rtl-flip" />
  </PaginationTrigger>
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

type PaginationLinkMode = {
  getPageHref: (pageNumber: number) => string;
};

type PaginationButtonMode = {
  onChangePage: (pageNumber: number) => void;
};

export type PaginationProps = ComponentProps<'div'> & {
  page: number;
  perPage: number;
  total: number;
  align?: 'side' | 'center';
  onChangePerPage: (perPage: number) => void;
} & (PaginationLinkMode | PaginationButtonMode);

export const perPageItems = [12, 24, 36, 48, 60];

const getPerPageOptions = (perPage: number): number[] => {
  const result: number[] = [];

  for (let i = 1; i <= 5; i++) {
    result.push(perPage * i);
  }

  return result;
};

const isLinkMode = (
  props: PaginationLinkMode | PaginationButtonMode
): props is PaginationLinkMode => typeof (props as PaginationLinkMode).getPageHref === 'function';

export const Pagination = (props: PaginationProps) => {
  const { page, perPage, total, align = 'center', onChangePerPage, className } = props;
  const totalPages = Math.ceil(total / perPage);
  const pages: (number | 'ellipsis')[] = [];
  const perPageItems = getPerPageOptions(perPage);

  const isLink = isLinkMode(props);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages.at(-1) !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  if (totalPages < 1) return null;

  return (
    <div {...props} className={cn('flex items-center', className)}>
      {align === 'center' && <div className="flex-1 hidden lg:block" />}
      <PaginationWrapper
        className={`w-full lg:w-auto lg:flex-1 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <PaginationContent className="w-full lg:w-auto justify-stretch lg:justify-start">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page <= 1 || totalPages <= 1}
              {...(isLink
                ? { href: props.getPageHref(page - 1) }
                : { onClick: () => props.onChangePage(page - 1) })}
            />
          </PaginationItem>
          <li className="lg:inline-flex lg:items-center grow lg:grow-0">
            <ul className="w-full flex items-center justify-center">
              {pages.map((p) => (
                <PaginationItem key={p}>
                  {p === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationTrigger
                      {...(isLink
                        ? { href: props.getPageHref(page) }
                        : { onClick: () => props.onChangePage(page) })}
                      isActive={p === page}
                      aria-disabled={p === page}
                    >
                      {p}
                    </PaginationTrigger>
                  )}
                </PaginationItem>
              ))}
            </ul>
          </li>

          <PaginationItem>
            <PaginationNext
              {...(isLink
                ? { href: props.getPageHref(page + 1) }
                : { onClick: () => props.onChangePage(page + 1) })}
              aria-disabled={page >= total || totalPages <= 1}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationWrapper>
      <div className=" items-center flex-1 gap-1 justify-end hidden lg:flex">
        <Typography variant="heading-5">Item per Page:</Typography>
        <div className="w-20">
          <Select
            value={perPage.toString() || '12'}
            onValueChange={(value) => onChangePerPage(Number(value))}
            disabled={total <= perPage}
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
      </div>
    </div>
  );
};
