import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

export const AspectRatio = ({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) => (
  <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
);
