import { Right } from '@ergo-raffle/icons';
import type { ComponentProps } from 'react';

const Link = (props: ComponentProps<'a'>) => <a {...props} />;

export type SeeMoreLinkProps = {
  href: string;
};

export const SeeMoreLink = ({ href }: SeeMoreLinkProps) => (
  <div className="flex justify-center mt-10.5">
    <Link
      href={href}
      className="inline-flex justify-center items-center gap-1 text-gray-2 hover:text-primary-1 transition-all duration-300 typo-heading-4"
    >
      See more <Right className="size-6" />
    </Link>
  </div>
);
