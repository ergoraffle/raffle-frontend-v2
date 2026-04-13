import type { FAQItemType } from './FAQItem';

export type TABs = {
  label: string;
  xsLabel: string;
  value: 'general' | 'supported_tokens' | 'raffle_creation' | 'baskets';
  items: FAQItemType[];
};

export const TABS: TABs[] = [
  {
    xsLabel: 'Creation',
    label: 'Raffle creation',
    value: 'raffle_creation',
    items: [
      {
        id: 3,
        question: 'Do all winners get a share of the gathered money?',
        answer: 'A raffle is a contest where participants can win prizes by purchasing tickets.'
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
        question: 'How do the Baskets work?',
        answer: 'A raffle is a contest where participants can win prizes by purchasing tickets.'
      }
    ]
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
        answer: 'A raffle is a contest where participants can win prizes by purchasing tickets.'
      }
    ]
  }
] as const;
