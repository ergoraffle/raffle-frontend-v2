import type { Metadata } from 'next';

import './globals.css';

import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Ergo Raffle',
  description: 'Ergo raffle is a crowdfunding system based on ergo contracts'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
