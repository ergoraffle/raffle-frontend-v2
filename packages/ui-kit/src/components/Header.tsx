import { useEffect, useState } from 'react';

import { DotMenuVertical, Recent } from '@ergo-raffle/icons';

import { useFramework } from '@/providers';

import { Button } from './Button';
import { ConnectWallet } from './ConnectWallet';
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
};

export const Header = ({ links, scrollThreshold = 10 }: HeaderProps) => {
  const Link = useFramework().components.Anchor;

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

  return (
    <header
      className={`py-3 sm:py-5 sticky top-0 bg-blur z-110 transition-all duration-300 mb-6.5 sm:mb-11 ${scrolled ? 'bg-white-3 shadow-1' : ''}`}
    >
      <div className="container flex items-center justify-between">
        <Logo className="h-12 hidden sm:flex" />
        <Logo className="h-9 sm:hidden" variant="icon" />
        <ul className="items-center gap-x-10 hidden sm:flex">
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
        <div className="flex items-center gap-x-1 sm:gap-x-3">
          <ThemeToggle className="hidden sm:flex" />
          <Button variant="primary-soft" className="hidden sm:inline-flex" asChild>
            <Link href="/activity">
              <Recent />
              Activity
            </Link>
          </Button>
          <ConnectWallet />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <DotMenuVertical />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-28 space-y-6">
                <ThemeToggle />
                <div className="no-scrollbar overflow-y-auto">
                  <ul className="flex flex-col gap-y-4.5">
                    {links.map((link) => (
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
