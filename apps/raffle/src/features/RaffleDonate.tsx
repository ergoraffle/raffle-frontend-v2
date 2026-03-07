import Image from 'next/image';
import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Field,
  FieldLabel,
  Input,
  Typography
} from '@ergo-raffle/ui-kit';

export type RaffleDonateProps = { tokenName?: string };

export const RaffleDonate = ({ tokenName }: RaffleDonateProps) => (
  <Collapsible>
    <CollapsibleContent>
      <Card className="mb-2">
        <CardContent className="flex items-stretch ">
          <div className="space-y-4 grow xl:max-w-1/2">
            <div>
              <Typography variant="heading-4" className="text-black-1 mb-1">
                How many Tickets to Get?
              </Typography>
              {tokenName ? (
                <Typography variant="subtitle-md" className="text-gray-2">
                  each Ticket = 2 {tokenName}
                </Typography>
              ) : null}
            </div>
            <Field>
              <Input />
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="checkout-terms" />
              <FieldLabel htmlFor="checkout-terms">
                I Agree to the{' '}
                <Link href="/terms" className="underline">
                  Terms of Use
                </Link>
              </FieldLabel>
            </Field>
          </div>
          <div className="relative w-1/2">
            <Image
              src="/illustrations/raffleDonateFormIllustration.svg"
              alt="Donate"
              fill
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </CollapsibleContent>
    <CollapsibleTrigger asChild>
      <Button variant="primary" className="w-full">
        Donate
      </Button>
    </CollapsibleTrigger>
  </Collapsible>
);
