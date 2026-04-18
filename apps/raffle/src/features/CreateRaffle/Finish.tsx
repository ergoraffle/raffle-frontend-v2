import Image from 'next/image';
import Link from 'next/link';

import {
  BasketStatus,
  Button,
  CardImageWrapper,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Typography
} from '@ergo-raffle/ui-kit';
import { useFormContext } from 'react-hook-form';

import { useInfoBlockchain } from '@/hooks/useInfoBlockchain';

import type { RaffleForm } from '../schemas';

export type FinishProps = {
  handleBack: () => void;
};

export const Finish = ({ handleBack }: FinishProps) => {
  const { data: infoBlockchainData } = useInfoBlockchain();
  const {
    getValues,
    formState: { errors },
    setValue
  } = useFormContext<RaffleForm>();
  const data = getValues();

  return (
    <div className="space-y-8">
      <Typography variant="heading-2">
        Confirm the following information for “{data.name}” raffle.
      </Typography>

      {data.images && data?.images.length > 0 ? (
        <div className="w-full lg:w-125 px-auto">
          <Carousel>
            <CarouselContent>
              {data.images.map((image) => (
                <CarouselItem key={image.id}>
                  <CardImageWrapper>
                    {!!image.url && (
                      <Image
                        src={image.url}
                        priority
                        alt={data.name}
                        className="h-81 w-full object-cover rounded-tl-md rounded-tr-md"
                        fill
                      />
                    )}
                  </CardImageWrapper>
                </CarouselItem>
              ))}
            </CarouselContent>
            {data.images.length > 1 ? <CarouselDots /> : null}
          </Carousel>
        </div>
      ) : null}
      {!!data.description && (
        <div className="space-y-1">
          <Typography variant="body-button">Description:</Typography>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: temporary bypass */}
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      )}
      <div>
        <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
          <Typography variant="body-button">Raffle deadline:</Typography>
          <Typography variant="body-lg" className="text-gray-1">
            {data.deadline}
          </Typography>
        </div>
        <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
          <Typography variant="body-button">Raffle goal:</Typography>
          <Typography variant="body-lg" className="text-gray-1">
            {data.amount} {data.tokenId}
          </Typography>
        </div>
        <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
          <Typography variant="body-button">Mission fund:</Typography>
          <Typography variant="body-lg" className="text-gray-1">
            {data.missionFund}%
          </Typography>
        </div>
        <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
          <Typography variant="body-button">Winners Pot:</Typography>
          <Typography variant="body-lg" className="text-gray-1">
            {data.winnerPotShare}%
          </Typography>
        </div>
        <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
          <Typography variant="body-button">Service fee:</Typography>
          <Typography variant="body-lg" className="text-gray-1">
            {infoBlockchainData?.fee.implementer}%
          </Typography>
        </div>
      </div>
      <div className="space-y-3">
        <Typography variant="heading-3" className="text-center">
          Baskets
        </Typography>
        <div>
          <div className="not-last:border-b border-b-black-4 space-y-3 py-3">
            <div className="flex justify-between">
              <Typography variant="body-button" className="flex items-center gap-2">
                <BasketStatus filled className="size-7" /> Share baskets:
              </Typography>
              <Typography variant="body-lg" className="text-gray-1">
                {data.details.length}
              </Typography>
            </div>
            <div className="flex gap-2 flex-wrap">
              {data.details.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-gray-5 text-gray-5-foreground rounded-sm px-1.25 py-1 gap-2"
                >
                  <div className="flex items-center gap-1">
                    <div className="bg-white-1 text-white-2-foreground px-0.5 py-px rounded-xs text-center size-7">
                      {item.count}
                    </div>
                    X
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-white-1 text-white-2-foreground py-0.5 px-px rounded-xs text-center size-7">
                      {item.percent}
                    </div>
                    %
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between not-last:border-b border-b-black-4 py-3">
            <Typography variant="body-button" className="flex items-center gap-2">
              <BasketStatus className="size-7" /> Empty baskets:
            </Typography>
            <Typography variant="body-lg" className="text-gray-1">
              {data.emptyBaskets}
            </Typography>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Typography variant="heading-3" className="text-center">
          Agreement
        </Typography>

        <Field orientation="horizontal">
          <Checkbox
            checked={getValues('terms')}
            onClick={() => {
              setValue('terms', !getValues('terms'), { shouldValidate: true });
            }}
          />
          <div>
            <FieldLabel>
              I have read and agree to the{' '}
              <Link href="/terms" className="underline hover:text-secondary-1">
                terms
              </Link>{' '}
              outlined in the Ergo Raffle User Agreement.
            </FieldLabel>
            {!!errors.terms && <FieldError>{errors.terms.message}</FieldError>}
          </div>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            checked={getValues('eligibility')}
            onClick={() =>
              setValue('eligibility', !getValues('eligibility'), { shouldValidate: true })
            }
          />
          <div>
            <FieldLabel>
              I confirm that I am not a resident of a country where participation in raffles is
              prohibited.
            </FieldLabel>
            {!!errors.eligibility && <FieldError>{errors.eligibility.message}</FieldError>}
          </div>
        </Field>
      </div>

      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" className="w-32.5 sm:w-70" onClick={handleBack}>
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-32.5 sm:w-70"
          disabled={!!Object.keys(errors).length}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
