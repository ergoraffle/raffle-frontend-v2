'use client';

import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  type AnchorComponent,
  FrameworkProvider,
  type ImageComponent as ImageComponentType,
  ThemeProvider
} from '@ergo-raffle/ui-kit';

import { Toaster } from '@/components';

const Anchor: AnchorComponent = (props) => <Link {...props} />;
const ImageComponent: ImageComponentType = (props) => <Image {...props} />;

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <Toaster />
    <FrameworkProvider components={{ Anchor, Image: ImageComponent }}>{children}</FrameworkProvider>
  </ThemeProvider>
);
