import { useEffect, useMemo, useState } from 'react';

import { raffleInfo } from '@ergo-raffle/contracts';
import { DotMenuVertical, Recent } from '@ergo-raffle/icons';

import { useFramework } from '@/providers';

import { Button } from './Button';
import { Logo } from './Logo';
import { Sheet, SheetContent, SheetTrigger } from './Sheet';
import { ThemeToggle } from './ThemeToggle';
import { Typography } from './Typography';

type Link = {
  text: string;
  href: string;
};

export type HeaderProps = {
  links: Array<Link>;
  scrollThreshold?: number;
  connectWalletRender: () => React.ReactNode;
  activityLink?: string;
};

export const Header = ({
  links,
  scrollThreshold = 10,
  connectWalletRender,
  activityLink
}: HeaderProps) => {
  const Link = useFramework().components.Anchor;
  const ConnectWallet = connectWalletRender;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  const mobileLinks = useMemo(
    () => [...(activityLink ? [{ text: 'Activity', href: activityLink }] : []), ...links],
    [links, activityLink]
  );

  return (
    <header
      className={`py-3 lg:py-5 sticky top-0 bg-blur z-110 transition-all duration-300 mb-6.5 lg:mb-11 ${scrolled ? 'bg-white-3 shadow-1' : ''}`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-end gap-2">
          <Link href="/">
            <Logo className="h-12 hidden lg:flex" />
            <Logo className="h-9 lg:hidden" variant="icon" />
          </Link>
          {raffleInfo.network === 'Testnet' && (
            <Typography
              variant="subtitle-sm"
              className="text-primary-1 py-0.5 px-1 rounded-sm border border-primary-1 lg:mb-2"
              asChild
            >
              <span>Testnet</span>
            </Typography>
          )}
        </div>
        <ul className="items-center gap-x-10 hidden lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Typography variant="heading-5" asChild>
                <Link className="hover:text-primary-1 transition-all duration-300" href={link.href}>
                  {link.text}
                </Link>
              </Typography>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-x-1 lg:gap-x-3">
          <ThemeToggle className="hidden lg:flex" />
          {!!activityLink && (
            <Button variant="primary-soft" className="hidden lg:inline-flex" asChild>
              <Link href={activityLink}>
                <Recent />
                Activity
              </Link>
            </Button>
          )}
          <ConnectWallet />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <DotMenuVertical />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-28 space-y-6">
                <ThemeToggle />
                <div className="no-scrollbar overflow-y-auto">
                  <ul className="flex flex-col gap-y-4.5">
                    {mobileLinks.map((link) => (
                      <li key={link.href}>
                        <Typography variant="heading-5" asChild>
                          <Link
                            className="hover:text-primary-1 transition-all duration-300"
                            href={link.href}
                          >
                            {link.text}
                          </Link>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
