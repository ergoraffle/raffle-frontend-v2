import { Button, Field, FieldError, FieldLabel, Input } from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type PurchaseForm as PurchaseFormType, purchaseSchema } from '@/features/schemas';

export const PurchaseForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<PurchaseFormType>({
    resolver: zodResolver(purchaseSchema)
  });

  const onSubmit = (data: PurchaseFormType) => {
    // biome-ignore lint/suspicious/noConsole: replace with call service
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>Enter your Ergo wallet address</FieldLabel>
        <Input variant="bordered" {...register('address')} size="xs" />
        {!!errors.address && <FieldError>{errors.address.message}</FieldError>}
      </Field>
      <div className="mt-3.5 text-right">
        <Button disabled={isSubmitting} type="submit" className="w-48" variant="primary-soft">
          Next
        </Button>
      </div>
    </form>
  );
};
