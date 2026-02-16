'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';

import { type AnchorComponent, FrameworkProvider } from '@ergo-raffle/ui-kit';

const Anchor: AnchorComponent = (props) => <Link {...props} />;

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <FrameworkProvider components={{ Anchor }}>{children}</FrameworkProvider>
);
