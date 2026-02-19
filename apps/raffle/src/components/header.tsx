'use client';

import { useMemo } from 'react';

import { Header as HeaderPrimitive, useBreakpoint } from '@ergo-raffle/ui-kit';

export const Header = () => {
  const { down } = useBreakpoint();

  const isMobile = down('lg');

  const desktopMenuLinks = useMemo(
    () => [
      { text: 'All raffles', href: '/raffles' },
      { text: 'FAQ', href: '/faq' },
      { text: 'About/Contact', href: '/' }
    ],
    []
  );
  const mobileMenuLinks = useMemo(
    () => [
      { text: 'Activity', href: '/activity' },
      { text: 'All raffles', href: '/raffles' },
      { text: 'FAQ', href: '/faq' },
      { text: 'About/Contact', href: '/about' }
    ],
    []
  );

  return <HeaderPrimitive links={isMobile ? mobileMenuLinks : desktopMenuLinks} />;
};
