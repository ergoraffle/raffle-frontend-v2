import type { FaqItemType } from './FaqItem';

export type Tabs = {
  label: string;
  xsLabel: string;
  value: 'general' | 'supported_tokens' | 'raffle_creation' | 'baskets';
  items: FaqItemType[];
};

export const tabs: Tabs[] = [
  {
    xsLabel: 'Creation',
    label: 'Raffle creation',
    value: 'raffle_creation',
    items: [
      {
        id: 1,
        question: 'What are Raffle fees?',
        answer: (
          <>
            <p>
              There are three types of fees within Raffles. A Raffle creation fee, a Raffle donation
              fee, and a service fee. The first two fees are just network transaction fees; we do
              not charge any more for the service than facilitating the Raffle creation and
              donation. Currently, 5% of the total raised money by a successful Raffle is paid as a
              service fee.
            </p>
            <p>
              It is worth mentioning that the service is fully decentralized; anyone can join the
              Raffle or mark a Raffle as successful or unsuccessful and take the needed actions.
              However, this service is designed such that anyone with any amount of knowledge can
              use it. The service uses proxy contracts for its activities; an advanced user can use
              this service through raw scripts and reduce the proxy transaction fees. You can read
              more technical details on the documentation page.
            </p>
          </>
        )
      },
      {
        id: 2,
        question: 'What is the minimum ticket price I can charge for my raffle?',
        answer: (
          <p>
            Technically, 0.XX ERG, however, we recommend looking through previous successful raffles
            to gauge the best level for your raffle.
          </p>
        )
      },
      {
        id: 3,
        question: 'What is the maximum ticket price I can charge for my raffle?',
        answer: (
          <p>
            There is no maximum price. However, if the ticket is too expensive people may be
            discouraged from entering.
          </p>
        )
      },
      {
        id: 4,
        question: 'Can entrants purchase more than one raffle ticket?',
        answer: <p>Yes, entrants can purchase as many tickets as they like.</p>
      }
    ]
  },
  {
    xsLabel: 'Baskets',
    label: 'Baskets',
    value: 'baskets',
    items: []
  },
  {
    xsLabel: 'Tokens',
    label: 'Supported tokens',
    value: 'supported_tokens',
    items: []
  },
  {
    xsLabel: 'General',
    label: 'General',
    value: 'general',
    items: [
      {
        id: 1,
        question: 'What is a raffle?',
        answer: (
          <>
            <p>
              A Raffle is a crowdfunding service that aims to enable anyone to raise enough money
              needed for a project. The project can be a direct donation to a charity, an academic
              or business plan, or anything else the creator can convince people to part with their
              hard-earned ERG for.
            </p>
            <p>
              As an added bonus, after finishing the Raffle, a lottery takes place, and a lucky
              participant wins the Raffle reward. The probability of winning the Raffle reward is
              proportional to the participation; the more donations to the crowdfunding campaign,
              the more chance of winning the prize!
            </p>
            <p>
              This Raffle service is based on the Ergo network and raises Ergs for the projects.
              Other Raffle settings are adaptable and can be customized by the Raffle creator.
            </p>
          </>
        )
      },
      {
        id: 2,
        question: 'How to participate in a Raffle?',
        answer: (
          <>
            <p>
              Anyone can participate in the active Raffles by buying tickets. The Raffle creator
              sets the ticket price, and the number of tickets you purchase will determine your
              chance of winning the prize pool. However, there is no benefit to splitting your
              orders to try and garner a higher chance of winning and it is best to buy at once.
            </p>
            <p>
              You set the wallet address and specify the number of tickets you want to buy on the
              Raffle page. An address is generated to which you send funds to complete your order.{' '}
              <b>Please pay close attention to the wallet address you've set</b> as any rewards will
              also be sent to this address if you win the Raffle. Or in the case of an unsuccessful
              Raffle or any problems, refunds will also be sent to this address.
            </p>
          </>
        )
      },
      {
        id: 3,
        question: 'How do Raffles finish?',
        answer: (
          <>
            <p>
              Each Raffle has a deadline set based on the network height and a goal set by the
              Raffle creator for raised funds. If the Raffle can raise enough money within the
              deadline, it will be marked as successful and funded. At the same time, the Raffle
              prize-pool winner will also be announced and rewarded.
            </p>
            <p>
              If the Raffle can not raise enough money within the deadline, the Raffle is
              unsuccessful, and all donators will be refunded. You are free to submit again with
              improvements or based on feedback from the community.
            </p>
          </>
        )
      },
      {
        id: 5,
        question: 'Do I need a license to host a raffle on your platform?',
        answer: (
          <p>
            No. All Raffles on our platform are legally classed as 'prize competitions' which do not
            require a license.
          </p>
        )
      },
      {
        id: 6,
        question: 'Can I host a raffle in my business name?',
        answer: <p>Yes. You can host a raffle in your personal name or your business name.</p>
      },
      {
        id: 7,
        question: 'What happens if the Raffle isn’t funded by the draw date?',
        answer: (
          <p>
            Entrants will have their funds refunded and your Raffle will be marked as unsuccessful.
          </p>
        )
      }
    ]
  }
] as const;
