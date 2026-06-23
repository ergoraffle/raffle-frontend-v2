import Link from 'next/link';

import { Discord, Github, Mail, Telegram, X } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { About } from './About';
import { Divider } from './Divider';

const contactItems = [
  {
    title: 'GitHub',
    icon: <Github className="size-8" />,
    link: { text: 'Explore the code', href: 'https://github.com/ergoraffle' }
  },
  {
    title: 'Discord',
    icon: <Discord className="size-8" />,
    link: { text: 'Ask your questions', href: 'https://discord.gg/hn97ZCrk5f' }
  },
  {
    title: 'X',
    icon: <X className="size-8" />,
    link: { text: 'Join the community', href: 'https://x.com/ErgoRaffle' }
  },
  {
    title: 'Telegram',
    icon: <Telegram className="size-8" />,
    link: { text: 'Get updates', href: 'https://t.me/ergoraffle' }
  }
];

const AboutPage = () => (
  <div className="space-y-7">
    <About />
    <div className="mx-auto max-w-6xl">
      <div className="space-y-8">
        <div className="text-center">
          <Typography variant="display-sm">Get in touch</Typography>
          <Typography variant="body-lg">Get updates firsthand</Typography>
          <Typography variant="body-lg">Feel free to send us a message!</Typography>
        </div>
        <Card>
          <CardContent>
            <div className="my-7 mx-auto max-w-5xl space-y-8">
              <div className="mx-auto max-w-3xl space-y-3 text-center">
                <Typography variant="body-lg">
                  We're the team behind ErgoRaffle — builders who believe fundraising should be as
                  unstoppable as the chain it runs on. ErgoRaffle turns crowdfunding into a
                  provably-fair, on-chain game: no custody, no middlemen, no off switch. It's our
                  take on what a decentralized dApp should be — open code on Ergo that just keeps
                  running, keeps paying out, and answers only to the people who use it. Win or lose,
                  the ecosystem grows.
                </Typography>
                <div className="flex items-center justify-center gap-3">
                  <Mail className="size-6" />
                  <Link className="underline hover:text-primary-1" href="mailto:raffle@rosen.tech">
                    raffle@rosen.tech
                  </Link>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4">
                {contactItems.map((item) => (
                  <div
                    className="item flex flex-col items-center justify-center gap-2"
                    key={item.title}
                  >
                    {item.icon}
                    <Typography variant="subtitle-lg" asChild>
                      <Link
                        href={item.link.href}
                        target="_blank"
                        className="underline hover:text-primary-1 text-gray-1 text-center"
                      >
                        {item.link.text}
                      </Link>
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);
export default AboutPage;
