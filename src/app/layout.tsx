import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Ergo Raffle',
  description: 'Ergo raffle is a crowdfunding system based on ergo contracts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
