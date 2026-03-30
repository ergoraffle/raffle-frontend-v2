import type { ComponentProps } from 'react';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

export type CollapsibleProps = ComponentProps<typeof CollapsiblePrimitive.Root>;

export const Collapsible = ({ ...props }: CollapsibleProps) => (
  <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
);

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

export const CollapsibleTrigger = ({ ...props }: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />
);

export type CollapsibleContentProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>;

export const CollapsibleContent = ({ ...props }: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />
);
