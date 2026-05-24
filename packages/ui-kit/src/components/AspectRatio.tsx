import type { ComponentProps } from 'react';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

export type AspectRatioProps = ComponentProps<typeof AspectRatioPrimitive.Root>;

export const AspectRatio = ({ ...props }: AspectRatioProps) => (
  <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
);
