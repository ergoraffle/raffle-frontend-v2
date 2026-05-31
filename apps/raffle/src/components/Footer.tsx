import { useMemo } from 'react';

import { Discord, Telegram, X } from '@ergo-raffle/icons';
import { Footer as FooterPrimitive } from '@ergo-raffle/ui-kit';

export const Footer = () => {
  const links = useMemo(
    () => [
      {
        text: 'Github',
        href: 'https://github.com/ergoraffle'
      },
      {
        text: 'Raffle V1',
        href: 'https://ergoraffle.com'
      },
      {
        text: 'Whitepaper',
        href: 'https://github.com/ergoraffle/raffle-v2/blob/dev/packages/contracts/README.md'
      },
      {
        text: 'Support',
        href: 'https://discord.gg/hn97ZCrk5f'
      },
      {
        text: 'Contact',
        href: 'mailto:raffle@rosen.tech'
      }
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        href: 'https://x.com/ergo_platform',
        icon: <X />
      },
      {
        href: 'https://discord.gg/hn97ZCrk5f',
        icon: <Discord />
      },
      {
        href: 'https://t.me/ergoraffle',
        icon: <Telegram />
      }
    ],
    []
  );

  return <FooterPrimitive links={links} socialLinks={socialLinks} />;
};
