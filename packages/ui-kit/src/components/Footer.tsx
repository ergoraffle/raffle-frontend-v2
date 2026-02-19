import type { ReactNode } from 'react';

import { useFramework } from '@/providers';

import { Logo } from './Logo';
import { Typography } from './Typography';

type Link = {
  text: string;
  href: string;
};

type SocialLink = {
  href: string;
  icon: ReactNode;
};

export type FooterProps = {
  links: Array<Link>;
  socialLinks: Array<SocialLink>;
};

export const Footer = ({ links, socialLinks }: FooterProps) => {
  const Link = useFramework().components.Anchor;

  return (
    <footer className="container mt-5.5">
      <div className="relative before:absolute before:bg-primary-1 before:-z-10 before:rounded-full before:size-11 lg:before:size-18 before:bottom-24 before:right-16 lg:before:bottom-1 lg:before:-right-4 after:absolute after:bg-primary-1 after:-z-10 after:rounded-full after:size-16 lg:after:size-24 after:-bottom-2 after:left-4 lg:after:bottom-7 lg:after:left-16">
        <div className="bg-blur shadow-6 flex flex-col items-center justify-center rounded-lg lg:rounded-2xlg p-3 lg:p-7 ">
          <Logo className="h-18 hidden lg:block" />
          <Logo className="h-9 lg:hidden" variant="icon" />
          <div className="flex flex-col items-center mt-6 lg:mt-10.5 gap-2 lg:gap-1 pb-2 lg:pb-5 lg:w-2/5 text-black-1 relative after:h-px after:absolute after:w-4/5 after:bg-gray-3 after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            <ul className="flex flex-wrap gap-y-2 lg:gap-y-1 gap-x-5 lg:gap-x-10.5 items-center justify-center">
              {links.map((link) => (
                <li key={link.href}>
                  <Typography variant="heading-5" asChild>
                    <Link
                      href={link.href}
                      className="hover:text-primary-1 transition-all duration-300"
                    >
                      {link.text}
                    </Link>
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex items-center justify-center gap-4 mt-2 lg:mt-6">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="[&_>svg]:size-6">
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Typography variant="subtitle-lg" asChild>
        <div className="p-3.5 lg:p-6 text-center text-black-2">CopyRight © ErgoRaffle</div>
      </Typography>
    </footer>
  );
};
