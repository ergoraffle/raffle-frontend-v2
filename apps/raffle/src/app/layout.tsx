import type { Metadata } from 'next';
import '@ergo-raffle/ui-kit/index.css';
import './globals.css';

import type { PropsWithChildren } from 'react';

import { fraunces, karla, poppins } from './fonts';
import { AppProviders } from './(providers)';

export const metadata: Metadata = {
  title: 'Ergo Raffle',
  description: 'Ergo raffle is a crowdfunding system based on ergo contracts'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html
    lang="en"
    className={`
        ${fraunces.variable}
        ${poppins.variable}
        ${karla.variable}
      `}
  >
    <body className="antialiased">
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;
