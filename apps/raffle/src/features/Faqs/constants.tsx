import Link from 'next/link';

import type { FaqItemType } from './FaqItem';

export type Tabs = {
  label: string;
  xsLabel: string;
  value: 'general' | 'supported_tokens' | 'raffle_creation' | 'baskets';
  items: FaqItemType[];
};

export const tabs: Tabs[] = [
  {
    xsLabel: 'General',
    label: 'General',
    value: 'general',
    items: [
      {
        id: 1,
        question: 'What is a raffle?',
        answer: (
          <p>
            A raffle on ErgoRaffle is a decentralized crowdfunding campaign with a built-in lottery.
            Supporters buy tickets toward a funding goal; after the deadline, if the goal is
            reached, one or more winners are drawn (probability proportional to tickets bought) and
            receive a reward, while the creator/cause receives their share. It runs entirely through
            smart contracts on the Ergo blockchain.
          </p>
        )
      },
      {
        id: 2,
        question: 'How do I participate in a raffle?',
        answer: (
          <p>
            Choose how many tickets to buy at the creator's set price and provide the wallet address
            that should receive any winnings or refund. The app generates a payment address; you
            send the funds there to complete your order.{' '}
            <b>Double-check the wallet address you set</b> — all rewards and refunds are sent to it.
          </p>
        )
      },
      {
        id: 3,
        question: 'What wallets are supported?',
        answer: (
          <p>
            ErgoRaffle v2 connects to <b>Nautilus</b> and <b>Xverse</b>. Connect your wallet through
            the "Connect wallet" button to create raffles, buy tickets, add gifts, and claim prizes
            or refunds. ErgoRaffle is non-custodial — it never holds your keys; every action is a
            transaction you sign in your own wallet.
          </p>
        )
      },
      {
        id: 4,
        question: 'How and when does a raffle finish?',
        answer: (
          <>
            <p>
              Each raffle has a <b>deadline</b> defined by Ergo network block height and a{' '}
              <b>funding goal</b> set by the creator. When the deadline passes:
            </p>
            <ul>
              <li>
                <b>Goal met → successful:</b> the raised assets are split per the creator/winner
                percentages (after the protocol fee), winners are drawn and announced, and the
                creation fee is refunded to the creator.
              </li>
              <li>
                <b>Goal not met → unsuccessful:</b> the raffle enters refund mode and everyone is
                paid back — except the creation fee, which is collected and <b>not</b> refunded.
              </li>
            </ul>
          </>
        )
      },
      {
        id: 5,
        question: 'How is the winner chosen — is the draw fair?',
        answer: (
          <p>
            The draw is deterministic and <b>publicly verifiable on-chain</b>, not run by the
            ErgoRaffle team. When a successful raffle is drawn it pulls a random seed from an{' '}
            <b>on-chain randomness oracle box</b> (added as a data input and referenced by its box
            id, so it can't be swapped for a hand-picked value). The winning ticket index is then
            computed by a fixed formula — roughly{' '}
            <code>byteArrayToBigInt(seed) % number of tickets</code> — and weighted by how many
            tickets each address holds, so more tickets means a proportionally higher chance.
            Because both the oracle value and the formula are on-chain, anyone can re-check that the
            announced winner is the one the rules produce.
          </p>
        )
      },
      {
        id: 6,
        question: "What happens if the raffle isn't funded by the deadline?",
        answer: (
          <p>
            All ticket buyers have their contributions refunded and gift contributors can reclaim
            their gifts; the raffle is marked unsuccessful. No protocol fee is charged on a failed
            raffle, but the creator's <b>creation fee is collected and not refunded</b> (it exists
            as spam prevention).
          </p>
        )
      },
      {
        id: 7,
        question: 'How do I claim a refund or a prize?',
        answer: (
          <p>
            Refunds and prizes are sent to the wallet address you set when participating. Depending
            on the contract flow you may need to submit a claim/redeem transaction from that wallet
            through the app.
          </p>
        )
      },
      {
        id: 8,
        question: 'Is ErgoRaffle custodial — does it hold my money?',
        answer: (
          <p>
            No. ErgoRaffle is non-custodial and decentralized. Funds are locked in smart-contract
            boxes on the Ergo blockchain, governed by the raffle's rules, not by the ErgoRaffle
            team. Advanced users can bypass the hosted UI entirely and interact with the contracts
            using raw scripts.
          </p>
        )
      },
      {
        id: 9,
        question: 'Do I need a license to host or join a raffle?',
        answer: (
          <p>
            It is <b>your responsibility</b> to determine whether you may legally run or take part
            in a raffle in your jurisdiction. ErgoRaffle is simply a decentralized blockchain dApp —
            it has <b>no tools or measures to verify legality, identity, or eligibility</b>, and
            performs no such checks. Both creators and donors are liable for their own legal
            compliance. (Raffles are often classed as "prize competitions," but this is general
            information, not legal advice.)
          </p>
        )
      },
      {
        id: 10,
        question: 'Can I host a raffle in my business name?',
        answer: (
          <p>Yes. You can run a raffle under your personal name or a business/organization name.</p>
        )
      },
      {
        id: 11,
        question: 'Is this mainnet or testnet?',
        answer: (
          <p>
            The current beta runs on <b>testnet</b> (testnet-beta.ergoraffle.com). You can test it
            using <b>any token on testnet</b>, not only test ERG.
          </p>
        )
      }
    ]
  },
  {
    xsLabel: 'Creation',
    label: 'Raffle creation',
    value: 'raffle_creation',
    items: [
      {
        id: 1,
        question: 'What are the fees in a Raffle?',
        answer: (
          <>
            <p>There are three types of fees in ErgoRaffle v2:</p>
            <ul>
              <li>
                <b>Protocol fee</b> — a percentage of the funds raised by a <i>successful</i> raffle
                goes to the ErgoRaffle protocol. This is currently <b>5%</b> and is only ever taken
                from raffles that reach their goal. Failed raffles pay no protocol fee.
              </li>
              <li>
                <b>Creation fee</b> — a one-time fee paid when you create a raffle, primarily as{' '}
                <b>spam prevention</b>. It is <b>refunded if the raffle succeeds</b> and{' '}
                <b>kept (not refunded) if the raffle fails</b>.
              </li>
              <li>
                <b>Network fees</b> — standard Ergo transaction fees paid to miners. A single raffle
                involves several on-chain transactions across its lifecycle (creation, donations,
                withdrawal/refund, and claims), and each one pays its own network fee.
              </li>
            </ul>
          </>
        )
      },
      {
        id: 2,
        question: "Can I use ErgoRaffle without paying the UI's proxy fee?",
        answer: (
          <p>
            Yes. ErgoRaffle is decentralized — advanced users can interact with the contracts
            directly using raw scripts to avoid the convenience (proxy) fee charged by the hosted
            UI.
          </p>
        )
      },
      {
        id: 3,
        question: 'What is the minimum ticket price I can set?',
        answer: (
          <p>
            There's no meaningful lower limit beyond covering the network's minimum box value — in
            practice a small fraction of an ERG. We recommend looking through previous successful
            raffles to gauge a sensible price for your audience.
          </p>
        )
      },
      {
        id: 4,
        question: 'What is the maximum ticket price I can set?',
        answer: (
          <p>
            There is no hard maximum. Keep in mind that a ticket priced too high can discourage
            participation and make the funding goal harder to reach before the deadline.
          </p>
        )
      },
      {
        id: 5,
        question: 'Can a participant buy more than one ticket?',
        answer: (
          <p>
            Yes. Participants can buy as many tickets as they like. The more tickets an address
            holds, the higher its proportional chance of being drawn as a winner.
          </p>
        )
      },
      {
        id: 6,
        question: 'How are the funds split when a raffle succeeds?',
        answer: (
          <p>
            When you create a raffle you set the split between the <b>creator/cause percentage</b>{' '}
            (the funds the project receives) and the <b>winner percentage</b> (the prize pool). On
            success the contract distributes the raised assets according to those percentages, after
            the protocol fee.
          </p>
        )
      },
      {
        id: 7,
        question: 'Can a raffle have more than one winner?',
        answer: (
          <p>
            Yes. The creator chooses the number of winners at setup. Each winner is drawn by lottery
            (weighted by tickets held) and receives a share of the prize pool — their{' '}
            <b>winner basket</b>.
          </p>
        )
      }
    ]
  },
  {
    xsLabel: 'Baskets',
    label: 'Baskets',
    value: 'baskets',
    items: [
      {
        id: 1,
        question: 'What is a winner basket?',
        answer: (
          <p>
            A <i>winner basket</i> is the bundle of rewards a single raffle winner receives. For a
            multi-winner raffle there is one basket per winning slot. A basket can contain the
            winner's share of whatever the raffle raised (which need <b>not</b> be ERG — a raffle
            can raise various Ergo tokens) plus any <b>gifts</b> that have been added to the raffle.
          </p>
        )
      },
      {
        id: 2,
        question: 'What are gifts, and who can add them?',
        answer: (
          <p>
            Gifts are extra assets added to a raffle's winner baskets to make it more attractive.{' '}
            <b>Anyone</b> can add a gift after the raffle is created — not just the creator. A gift
            can be <b>any token on Ergo, including bridged tokens and NFTs</b>. Gifts are locked to
            the raffle and distributed to winners on success.
          </p>
        )
      },
      {
        id: 3,
        question: 'What happens to gifts if the raffle fails?',
        answer: (
          <p>
            If the raffle doesn't reach its goal by the deadline, it enters refund mode: ticket
            buyers are refunded and gift contributors can reclaim the assets they added. The only
            thing not returned is the creator's <b>creation fee</b>, which is kept as spam
            prevention.
          </p>
        )
      },
      {
        id: 4,
        question: 'How are baskets awarded?',
        answer: (
          <p>
            After the deadline, if the goal is met, winners are selected by a verifiable on-chain
            lottery weighted by the number of tickets each address holds. The contract assigns each
            winner their basket, which the winner then claims to their wallet.
          </p>
        )
      }
    ]
  },
  {
    // NOTE: `value` kept as 'supported_tokens' to preserve the Tabs union and any routing/filter
    // references; only the visible label was broadened to "Tokens & assets".
    xsLabel: 'Tokens',
    label: 'Tokens & assets',
    value: 'supported_tokens',
    items: [
      {
        id: 1,
        question: 'What assets can a raffle raise?',
        answer: (
          <p>
            A raffle can raise <b>any asset on Ergo</b>, including ERG and bridged tokens. The goal
            and tickets are <b>not</b> limited to ERG — the creator chooses which asset the raffle
            is denominated in. (NFTs cannot be used as the raised/goal asset.)
          </p>
        )
      },
      {
        id: 2,
        question: 'What can be added as a gift?',
        answer: (
          <p>
            <b>Any token on Ergo</b> — including bridged tokens and <b>NFTs</b> — can be added as a
            gift to a raffle's winner baskets.
          </p>
        )
      },
      {
        id: 3,
        question: "How does ErgoRaffle handle each raffle's tickets?",
        answer: (
          <p>
            Every raffle mints its <b>own unique ticket token</b> when it starts. Buying a ticket
            issues you that token, which records your contribution and your weight in the draw. When
            the raffle concludes (success or refund), the ticket tokens are redeemed and burned.
          </p>
        )
      },
      {
        id: 4,
        question: "Why don't I see a particular token?",
        answer: (
          <p>
            The UI shows a curated/known token list to protect users from spam or malicious tokens.
            If a token isn't listed, it may simply not be indexed yet by the frontend's token
            source.
          </p>
        )
      },
      {
        id: 5,
        question: 'Can I use Bitcoin or Runes with ErgoRaffle?',
        answer: (
          <p>
            Raffles themselves are always <b>created and settled on Ergo</b>, but you can{' '}
            <b>donate with Bitcoin or Runes</b>. They reach the raffle as their{' '}
            <Link
              className="underline hover:text-primary-1"
              href="https://app.rosen.tech"
              target="_blank"
            >
              Rosen Bridge
            </Link>
            –wrapped equivalents on Ergo (<b>rsBTC</b> / <b>rsRunes</b>), which the contracts treat
            like any other Ergo asset. This is <b>live on both the testnet beta and mainnet</b>.
          </p>
        )
      },
      {
        id: 6,
        question: 'How do I donate Bitcoin or Runes — do I need to bridge first?',
        answer: (
          <>
            <p>Two ways:</p>
            <ul>
              <li>
                <b>You already hold rsBTC / rsRunes on Ergo</b> — donate directly on Ergo like any
                other token, no extra steps.
              </li>
              <li>
                <b>You only hold native BTC / Runes (and may not use Ergo at all)</b> — use our
                centralized proxy, built in collaboration with{' '}
                <Link
                  className="underline hover:text-primary-1"
                  href="https://app.rosen.tech"
                  target="_blank"
                >
                  Rosen Bridge
                </Link>
                . The proxy gives you a Bitcoin address; you send BTC or Runes straight from a
                Bitcoin wallet such as <b>Xverse</b>, and the proxy handles bridging and the
                donation for you. You <b>don't</b> have to bridge anything yourself.
              </li>
            </ul>
            <p>
              In <b>both</b> cases you must provide an <b>Ergo address</b> — it's where any refund
              or prize is sent.
            </p>
          </>
        )
      },
      {
        id: 7,
        question: 'If I donated with Bitcoin or Runes, what do I get if I win or get refunded?',
        answer: (
          <p>
            Refunds and winnings are always sent to the <b>Ergo address you provided</b>, as the
            wrapped asset (<b>rsBTC / rsRunes</b>). You can then bridge them back to native
            BTC/Runes through{' '}
            <Link
              className="underline hover:text-primary-1"
              href="https://app.rosen.tech"
              target="_blank"
            >
              Rosen Bridge
            </Link>{' '}
            yourself if you wish.
          </p>
        )
      },
      {
        id: 8,
        question: 'Is there an extra fee for donating native BTC/Runes through the proxy?',
        answer: (
          <p>
            There's a small <b>proxy fee</b> for the convenience of the centralized BTC-direct
            route. There is{' '}
            <b>
              no additional{' '}
              <Link
                className="underline hover:text-primary-1"
                href="https://app.rosen.tech"
                target="_blank"
              >
                Rosen Bridge
              </Link>{' '}
              fee
            </b>{' '}
            on top of it. Donating rsBTC/rsRunes directly on Ergo avoids the proxy fee entirely.
          </p>
        )
      }
    ]
  }
] as const;
