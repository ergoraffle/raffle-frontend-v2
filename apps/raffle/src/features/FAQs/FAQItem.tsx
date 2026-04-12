import { Right } from '@ergo-raffle/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Typography
} from '@ergo-raffle/ui-kit';

export type FAQItemType = {
  id: number;
  question: string;
  answer: string;
};

export type FAQItemProps = {
  faq?: FAQItemType;
};

export const FAQItem = ({ faq }: FAQItemProps) => (
  <Collapsible className="rounded-sm data-[state=open]:bg-gray-5">
    <CollapsibleTrigger asChild>
      <div className="flex justify-between  border border-gray-5 rounded-sm p-3 group data-[state=open]:border-0">
        <Typography variant="body-lg">{faq?.question}</Typography>
        <Right className="size-6 group-data-[state=open]:rotate-90" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent className="px-3 pb-2">{faq?.answer}</CollapsibleContent>
  </Collapsible>
);
