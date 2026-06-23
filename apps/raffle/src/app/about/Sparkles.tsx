import { Ergo, GiftPlus, Spark, Ticket } from '@ergo-raffle/icons';

type Motif = {
  id: string;
  Icon: typeof Spark;
  pos: string;
  tone: string;
  rot?: string;
  kind: 'bob' | 'twinkle';
  delay: string;
};

const MOTIFS: Motif[] = [
  {
    id: 's1',
    Icon: Spark,
    pos: 'left-[1%] top-[6%] size-5',
    tone: 'text-primary-1',
    kind: 'twinkle',
    delay: '0s'
  },
  {
    id: 't1',
    Icon: Ticket,
    pos: 'left-[6%] top-[58%] size-8',
    tone: 'text-primary-1/40',
    rot: '-rotate-12',
    kind: 'bob',
    delay: '.6s'
  },
  {
    id: 'g1',
    Icon: GiftPlus,
    pos: 'right-[4%] top-[14%] size-8',
    tone: 'text-secondary-1/45',
    rot: 'rotate-6',
    kind: 'bob',
    delay: '1s'
  },
  {
    id: 's2',
    Icon: Spark,
    pos: 'right-[2%] top-[62%] size-6',
    tone: 'text-primary-1',
    kind: 'twinkle',
    delay: '.4s'
  },
  {
    id: 'e1',
    Icon: Ergo,
    pos: 'left-[26%] top-[-2%] size-5',
    tone: 'text-primary-1/45',
    kind: 'bob',
    delay: '1.3s'
  },
  {
    id: 's3',
    Icon: Spark,
    pos: 'right-[28%] top-[0%] size-4',
    tone: 'text-secondary-1/70',
    kind: 'twinkle',
    delay: '.9s'
  }
];

export const Sparkles = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    {MOTIFS.map(({ id, Icon, pos, tone, rot, kind, delay }) => (
      <span
        key={id}
        className={`about-spark absolute ${pos} ${tone}`}
        data-kind={kind}
        style={{ animationDelay: delay }}
      >
        <Icon className={`size-full ${rot ?? ''}`} />
      </span>
    ))}
    <style>{`
      .about-spark[data-kind='bob'] { animation: about-bob 6s ease-in-out infinite; }
      .about-spark[data-kind='twinkle'] { animation: about-twinkle 4s ease-in-out infinite; }
      @keyframes about-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes about-twinkle {
        0%, 100% { opacity: .3; transform: scale(.85); }
        50% { opacity: .95; transform: scale(1.12); }
      }
      @media (prefers-reduced-motion: reduce) {
        .about-spark { animation: none !important; opacity: .6; }
      }
    `}</style>
  </div>
);
