type Piece = {
  id: string;
  pos: string;
  shape: string;
  tone: string;
  delay: string;
};

const PIECES: Piece[] = [
  {
    id: 'p1',
    pos: 'left-[8%] top-[12%] size-2',
    shape: 'rounded-[2px]',
    tone: 'bg-primary-1',
    delay: '0s'
  },
  {
    id: 'p2',
    pos: 'left-[18%] top-[34%] size-1.5',
    shape: 'rounded-full',
    tone: 'bg-secondary-1',
    delay: '.5s'
  },
  {
    id: 'p3',
    pos: 'left-[28%] top-[8%] h-3 w-1.5',
    shape: 'rounded-[2px]',
    tone: 'bg-success',
    delay: '1s'
  },
  {
    id: 'p4',
    pos: 'left-[39%] top-[26%] size-2',
    shape: 'rounded-full',
    tone: 'bg-primary-1',
    delay: '.3s'
  },
  {
    id: 'p5',
    pos: 'left-[50%] top-[6%] size-1.5',
    shape: 'rounded-[2px]',
    tone: 'bg-secondary-1',
    delay: '1.2s'
  },
  {
    id: 'p6',
    pos: 'left-[61%] top-[28%] h-3 w-1.5',
    shape: 'rounded-[2px]',
    tone: 'bg-primary-1',
    delay: '.7s'
  },
  {
    id: 'p7',
    pos: 'left-[71%] top-[10%] size-2',
    shape: 'rounded-full',
    tone: 'bg-success',
    delay: '.2s'
  },
  {
    id: 'p8',
    pos: 'left-[81%] top-[30%] size-1.5',
    shape: 'rounded-[2px]',
    tone: 'bg-secondary-1',
    delay: '.9s'
  },
  {
    id: 'p9',
    pos: 'left-[91%] top-[14%] size-2',
    shape: 'rounded-full',
    tone: 'bg-primary-1',
    delay: '1.4s'
  },
  {
    id: 'p10',
    pos: 'left-[14%] top-[52%] size-1.5',
    shape: 'rounded-full',
    tone: 'bg-primary-1',
    delay: '.6s'
  },
  {
    id: 'p11',
    pos: 'left-[34%] top-[48%] size-2',
    shape: 'rounded-[2px]',
    tone: 'bg-primary-1',
    delay: '1.1s'
  },
  {
    id: 'p12',
    pos: 'left-[66%] top-[50%] size-1.5',
    shape: 'rounded-[2px]',
    tone: 'bg-success',
    delay: '.4s'
  },
  {
    id: 'p13',
    pos: 'left-[86%] top-[48%] size-2',
    shape: 'rounded-full',
    tone: 'bg-secondary-1',
    delay: '.8s'
  }
];

export const Confetti = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden sm:h-28"
  >
    {PIECES.map(({ id, pos, shape, tone, delay }) => (
      <span
        key={id}
        className={`about-confetti absolute ${pos} ${shape} ${tone}`}
        style={{ animationDelay: delay }}
      />
    ))}
    <style>{`
      .about-confetti { animation: about-confetti 5s ease-in-out infinite; opacity: .7; }
      @keyframes about-confetti {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(7px) rotate(35deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .about-confetti { animation: none !important; }
      }
    `}</style>
  </div>
);
