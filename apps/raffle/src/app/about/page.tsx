import Image from 'next/image';
import Link from 'next/link';

import { Discord, Github, Mail, Spark, Telegram, X } from '@ergo-raffle/icons';
import { Card, CardContent, CardImageWrapper, Typography } from '@ergo-raffle/ui-kit';

const contactItems = [
  {
    title: 'GitHub',
    icon: <Github className="size-8" />,
    link: { text: 'Explore our code', href: 'https://github.com/ergoraffle' }
  },
  {
    title: 'Discord',
    icon: <Discord className="size-8" />,
    link: { text: 'Ask your questions', href: 'https://discord.gg/hn97ZCrk5f' }
  },
  {
    title: 'X',
    icon: <X className="size-8" />,
    link: { text: 'Join our community', href: 'https://x.com/ergo_platform' }
  },
  {
    title: 'Telegram',
    icon: <Telegram className="size-8" />,
    link: { text: 'Get updates', href: 'https://t.me/ergoraffle' }
  }
];

const AboutPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <Typography variant="display-sm">Get in touch</Typography>
      <Typography variant="body-lg">Get updates firsthand</Typography>
      <Typography variant="body-lg">Feel free to send us a message!</Typography>
    </div>
    <Card>
      <CardContent>
        <div className="my-7 mx-auto max-w-5xl space-y-8">
          <div className="flex items-center flex-col md:flex-row gap-8">
            <div className="w-full max-w-78 h-[178.28px] m-auto lg:m-0 relative">
              <CardImageWrapper className="rounded-md shadow-2">
                <Image
                  src="/illustrations/imagePlaceholderIllustration.svg"
                  alt="Ergo Raffle"
                  fill
                  className="object-center object-contain"
                />
              </CardImageWrapper>
            </div>
            <div className="space-y-3">
              <Typography variant="body-lg">
                We are a passionate team committed to pioneering cutting-edge raffle experiences
                tailored for the Ergo blockchain community. Our focus is on delivering provably fair
                and engaging opportunities for users to win valuable prizes while supporting the
                growth of the Ergo ecosystem.
              </Typography>
              <div className="flex items-center gap-3">
                <Mail className="size-6" />
                <Link className="underline hover:text-primary-1" href="mailto:raffle@rosen.tech">
                  raffle@rosen.tech
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full max-w-160 mx-auto">
            <span className="block grow h-px border-t border-transparent [border-image:linear-gradient(-90deg,#E5654C_75.48%,rgba(229,101,76,0.1)_100%)_1]" />
            <Spark className="size-4 text-primary-1 mx-3" />
            <span className="block grow h-px border-t border-transparent [border-image:linear-gradient(90deg,#E5654C_75.48%,rgba(229,101,76,0.1)_100%)_1]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4">
            {contactItems.map((item) => (
              <div className="item flex flex-col items-center justify-center" key={item.title}>
                {item.icon}
                <Typography variant="body-lg" className="mt-2">
                  {item.title}
                </Typography>
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
);
export default AboutPage;
