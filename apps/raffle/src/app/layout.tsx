import '@ergo-raffle/ui-kit/index.css';
import './globals.css';

import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { LayoutBackground } from '@ergo-raffle/ui-kit';

import { Footer, Header } from '@/components';

import { AppProviders } from './(providers)';
import { fraunces, karla, poppins } from './fonts';
import { configureClient, enableMock } from '@ergo-raffle/client';

export const metadata: Metadata = {
  title: 'Ergo Raffle',
  description: 'Ergo raffle is a crowdfunding system based on ergo contracts'
};

configureClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

const RootLayout = async ({ children }: PropsWithChildren) => {
  await enableMock();

  return (
    <html
      lang="en"
      className={`
        ${fraunces.variable}
        ${poppins.variable}
        ${karla.variable}
      `}
    >
      <body className="antialiased">
        <AppProviders>
          <LayoutBackground>
            <Header />
            <div className="container min-h-dvh">{children}</div>
            <Footer />
          </LayoutBackground>
        </AppProviders>
      </body>
    </html>
  );
};
export default RootLayout;
