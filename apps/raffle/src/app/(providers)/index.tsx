'use client';

import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  type AnchorComponent,
  FrameworkProvider,
  type ImageComponent as ImageComponentType
} from '@ergo-raffle/ui-kit';

const Anchor: AnchorComponent = (props) => <Link {...props} />;
const ImageComponent: ImageComponentType = (props) => <Image {...props} />;

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <FrameworkProvider components={{ Anchor, Image: ImageComponent }}>{children}</FrameworkProvider>
);
