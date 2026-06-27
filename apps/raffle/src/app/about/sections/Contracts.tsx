import { Dice, Lock, Share, Verified } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { GLASS_SECTION } from '../ui';

const tokenClass = (word: string): string => {
  if (KEYWORDS.has(word)) return 'text-secondary-1';
  if (BUILTINS.has(word)) return 'text-primary-1';
  if (/^\d+$/.test(word)) return 'text-success';
  return '';
};

const BUILTINS = new Set(['SELF', 'INPUTS', 'OUTPUTS', 'HEIGHT', 'blake2b256']);

const CODE = `// Rafflora — Ticket contract (excerpt)
// Refunds are enforced on-chain, by the contract itself.

val ticketPrice = SELF.R5[Coll[Long]].get(2)
val ticketCount = SELF.tokens(0)._2

// the payout must return the exact donation, minus the tx fee
val redeemedDonation =
  safePayBox.value == SELF.value + ticketPrice * ticketCount - txFee

sigmaProp(allOf(Coll(
  blake2b256(ticketRedeem.propositionBytes) == ticketRedeemScriptHash,
  ticketRedeem.tokens(0)._1 == raffleLicense,
  redeemedDonation,
  INPUTS(1).id == SELF.id   // can't spend the same ticket twice
)))`;

const KEYWORDS = new Set(['val', 'if', 'else', 'sigmaProp', 'allOf', 'Coll']);

const LINES = CODE.split('\n').map((line, lineIndex) => {
  const commentAt = line.indexOf('//');
  const codePart = commentAt >= 0 ? line.slice(0, commentAt) : line;
  const comment = commentAt >= 0 ? line.slice(commentAt) : '';
  const tokens = codePart
    .split(/(\w+)/)
    .filter((chunk) => chunk !== '')
    .map((text, tokenIndex) => ({
      id: `${lineIndex}-${tokenIndex}`,
      text,
      cls: /^\w+$/.test(text) ? tokenClass(text) : ''
    }));
  return { id: `line-${lineIndex}`, tokens, comment };
});

const POINTS = [
  {
    id: 'non-custodial',
    icon: <Lock className="size-5" />,
    title: 'Non-custodial',
    desc: 'Funds live in contract boxes on-chain — never in a team wallet.'
  },
  {
    id: 'auditable',
    icon: <Verified className="size-5" />,
    title: 'Open & auditable',
    desc: 'The ErgoScript is public — read it, re-run it, verify it yourself.'
  },
  {
    id: 'deterministic',
    icon: <Dice className="size-5" />,
    title: 'Deterministic',
    desc: 'Outcomes are math and on-chain randomness, not trust in us.'
  },
  {
    id: 'unstoppable',
    icon: <Share className="size-5" />,
    title: 'Unstoppable',
    desc: 'No admin key, no pause button, no off switch.'
  }
];

export const Contracts = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3">
            <Typography variant="subtitle-md" className="uppercase tracking-wide text-primary-1">
              Trustless by design
            </Typography>
            <Typography variant="heading-2" asChild>
              <h2>Protected by powerful Ergo contracts</h2>
            </Typography>
            <Typography variant="body-lg" className="text-gray-1">
              Your funds never touch a server or a team wallet. Every raffle runs as open ErgoScript
              on Ergo — the rules execute exactly as written, and anyone can read or re-verify them.
            </Typography>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {POINTS.map((point) => (
              <li className="flex items-start gap-3" key={point.id}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-6 text-primary-1">
                  {point.icon}
                </span>
                <div className="space-y-0.5">
                  <Typography variant="subtitle-lg">{point.title}</Typography>
                  <Typography variant="body-sm" className="text-gray-1">
                    {point.desc}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -right-3 -top-4 z-10 size-14" aria-hidden>
            <div className="absolute inset-0 rounded-full bg-primary-1/30 blur-xl" />
            <svg viewBox="0 0 48 48" className="relative size-14" role="presentation">
              <title>Secured by contract</title>
              <defs>
                <linearGradient id="about-shield-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--color-primary-1)" />
                  <stop offset="1" stopColor="var(--color-secondary-1)" />
                </linearGradient>
              </defs>
              <path
                d="M24 3l16 6v12c0 10-7 17-16 21-9-4-16-11-16-21V9z"
                fill="var(--color-white-2)"
                stroke="url(#about-shield-grad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M16 24l6 6 11-13"
                fill="none"
                stroke="url(#about-shield-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-5 bg-gray-5/40 shadow-1">
            <div className="flex items-center gap-2 border-b border-gray-5 bg-gray-5/60 px-4 py-2.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-sm text-gray-1">ticket.es</span>
              <span className="ml-auto rounded bg-primary-6 px-2 py-0.5 text-primary-1 typo-subtitle-md uppercase">
                ErgoScript
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
              <code>
                {LINES.map((line) => (
                  <div className="min-h-[1.4em] whitespace-pre" key={line.id}>
                    {line.tokens.map((token) =>
                      token.cls ? (
                        <span className={token.cls} key={token.id}>
                          {token.text}
                        </span>
                      ) : (
                        <span key={token.id}>{token.text}</span>
                      )
                    )}
                    {line.comment ? (
                      <span className="text-gray-1/60 italic">{line.comment}</span>
                    ) : null}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
