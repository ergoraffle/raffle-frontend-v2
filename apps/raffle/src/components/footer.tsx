import { useMemo } from 'react';

import { Discord, Telegram, X } from '@ergo-raffle/icons';
import { Footer as FooterPrimitive } from '@ergo-raffle/ui-kit';

export const Footer = () => {
  const links = useMemo(
    () => [
      {
        text: 'Github',
        href: '/raffles'
      },
      {
        text: '6th link',
        href: '/6th-link'
      },
      {
        text: 'About/Contact',
        href: '/about'
      },
      {
        text: 'Github',
        href: '/'
      },
      {
        text: 'Github',
        href: '/github'
      },
      {
        text: 'Whitepaper',
        href: '/whitepaper'
      },
      {
        text: 'Fourth link',
        href: '/fourth-link'
      }
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        href: '/x',
        icon: <X />
      },
      {
        href: '/discord',
        icon: <Discord />
      },
      {
        href: '/telegram',
        icon: <Telegram />
      }
    ],
    []
  );

  return <FooterPrimitive links={links} socialLinks={socialLinks} />;
};
