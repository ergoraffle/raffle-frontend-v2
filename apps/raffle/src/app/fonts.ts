import { Fraunces, Karla, Poppins } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap'
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
});

export const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-karla',
  display: 'swap'
});
