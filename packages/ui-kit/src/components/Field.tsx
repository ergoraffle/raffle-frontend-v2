import { type ComponentProps, useMemo } from 'react';

import { cn } from '@/lib/utils';

import { Label, type LabelProps } from './Label';

export type FieldProps = ComponentProps<'div'>;

export const Field = ({ className, ...props }: FieldProps) => (
  <div data-slot="field" className={cn('group/field flex flex-col w-full', className)} {...props} />
);

export const FieldLabel = ({ className, ...props }: LabelProps) => (
  <Label
    data-slot="field-label"
    className={cn(
      'has-data-checked:bg-primary/5 has-data-checked:border-primary/30 mb-2 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 group/field-label peer/field-label flex w-fit leading-snug',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      className
    )}
    {...props}
  />
);

export type FieldDescriptionProps = ComponentProps<'p'>;

export const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p
    data-slot="field-description"
    className={cn(
      'text-gray-2 text-left typo-subtitle-md pl-4 [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-horizontal/field:text-balance',
      'last:mt-0 nth-last-2:-mt-1',
      'data-[invalid=true]:text-error[data-invalid=true]',
      '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      className
    )}
    {...props}
  />
);

export type FieldErrorProps = ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
};

export const FieldError = ({ className, children, errors, ...props }: FieldErrorProps) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }
    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {/* biome-ignore lint/suspicious/noArrayIndexKey: errors are static, order won't change */}
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-error pl-4 typo-subtitle-md', className)}
      {...props}
    >
      {content}
    </div>
  );
};
