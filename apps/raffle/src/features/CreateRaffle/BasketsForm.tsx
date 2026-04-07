import { useEffect, useState } from 'react';

import { Info } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  PercentageDistribution,
  type PercentageDistributionItem,
  Progress,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  Typography
} from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { calcPercentageDistribution } from '@/features/utils';
import { createBasketForm } from '@/mockApi';

import { type RaffleBasketsForm, raffleBasketsSchema } from '../schemas';
import { FieldTitle } from './FieldTitle';

export type BasketsFormProps = {
  handleNext: () => void;
  handleBack: () => void;
};

const shareSplitMethods = [{ value: 'decreasingStep', label: 'Decreasing step' }];

export const BasketsForm = ({ handleNext, handleBack }: BasketsFormProps) => {
  const [shareBasketCount, setShareBasketCount] = useState<number>();
  const [biggestShareBasket, setBiggestShareBasket] = useState<number>();
  const [percentageDistribution, setPercentageDistribution] =
    useState<PercentageDistributionItem[]>();

  useEffect(() => {
    if (shareBasketCount && biggestShareBasket) {
      const distribution = calcPercentageDistribution(shareBasketCount, biggestShareBasket);
      setPercentageDistribution(distribution);
    }
  }, [shareBasketCount, biggestShareBasket]);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm({
    resolver: zodResolver(raffleBasketsSchema)
  });

  const onSubmit = (data: RaffleBasketsForm) => {
    handleNext();
    createBasketForm(data);
  };

  const onBack = () => {
    reset();
    handleBack();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Typography variant="heading-2">Create Baskets.</Typography>
        <Typography variant="body-md">
          Each winner gets a basket. It can hold part of the raffle share, gifts, both or none.
        </Typography>
      </div>
      <div className="space-y-3">
        <div>
          <FieldTitle title="Distribute Winners Pot between Share Baskets." />
          <Typography variant="body-md" className="mt-1 mb-3">
            Winners Pot: 30% of Total Fund
          </Typography>
        </div>
        <Progress variant="box" value={30} max={100} />
        <div className="flex flex-col lg:flex-row  gap-x-5 gap-y-3">
          <Field className="sm:max-w-1/2 md:max-w-auto flex-1">
            <FieldLabel>Share Baskets</FieldLabel>
            <InputGroup variant="bordered">
              <InputGroupInput
                onChange={(e) => setShareBasketCount(Number(e.target.value))}
                value={shareBasketCount}
              />
              <InputGroupAddon align="inline-start">
                <BasketStatus className="size-6" filled />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Tooltip content="Share Baskets.">
                  <Info className="size-6" />
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <div className="flex-2 flex flex-col sm:flex-row gap-x-5 gap-y-3">
            <Field className="flex-1">
              <FieldLabel>Share split Method</FieldLabel>
              <Select defaultValue="decreasingStep">
                <SelectTrigger variant="bordered">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shareSplitMethods.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="flex-1">
              <FieldLabel>Biggest Share</FieldLabel>
              <Input
                variant="bordered"
                onChange={(e) => setBiggestShareBasket(Number(e.target.value))}
                value={biggestShareBasket}
              />
              <FieldDescription>minimum= 19.5</FieldDescription>
            </Field>
          </div>
        </div>
        <Field>
          <FieldLabel>Details</FieldLabel>
          <PercentageDistribution
            items={percentageDistribution}
            onChange={setPercentageDistribution}
          />
        </Field>
      </div>
      <div className="space-y-3">
        <FieldTitle title="Create Empty Baskets." />
        <Field>
          <FieldLabel>Empty Baskets</FieldLabel>
          <InputGroup className="max-w-70 w-full" variant="bordered">
            <InputGroupInput {...register('emptyBaskets', { valueAsNumber: true })} />
            <InputGroupAddon align="inline-start">
              <BasketStatus className="size-6" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Tooltip content="Empty Baskets.">
                <Info className="size-6" />
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          {!!errors.emptyBaskets && <FieldError>{errors.emptyBaskets.message}</FieldError>}
        </Field>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" className="w-32.5 sm:w-70" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" className="w-32.5 sm:w-70">
          Next
        </Button>
      </div>
    </form>
  );
};
