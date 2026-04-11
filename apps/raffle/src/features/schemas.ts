import { z } from 'zod';

import { SERVICE_SHARE } from '@/features/constants';

const MAX_SHARE = 100 - SERVICE_SHARE;

export const raffleSpecificationsSchema = z.object({
  name: z
    .string({
      message: 'Name is required'
    })
    .trim()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long'),
  description: z.string().max(1024, 'Description is too long').optional(),
  tags: z.array(z.string()).max(5, 'Can not be more than 5').optional(),
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string().optional(),
        name: z.string()
      })
    )
    .max(4, 'Can not be more than 4')
    .optional(),
  deadline: z
    .number({
      message: 'Deadline is required'
    })
    .min(1, 'Deadline must be at least 1')
});

export const raffleDonationGoalSchema = z
  .object({
    tokenId: z.string({ message: 'Can not be empty' }),
    tokenName: z.string({ message: 'Can not be empty' }),
    count: z.string({ message: 'Can not be empty' }),
    amount: z.string({ message: 'Can not be empty' }),
    missionFund: z.number({ message: 'Can not be empty' }).min(1, 'Can not be less than 1'),
    winnerPotShare: z.number({ message: 'Can not be empty' }).min(1, 'Can not be less than 1'),
    address: z.string({ message: 'Can not be empty' })
  })
  .check(
    z.superRefine((data, ctx) => {
      if (data.missionFund + data.winnerPotShare > MAX_SHARE) {
        ctx.addIssue({
          code: 'custom',
          inclusive: true,
          message: `Sum must not exceed ${MAX_SHARE}`,
          path: ['missionFund'],
          input: data.missionFund
        });
        ctx.addIssue({
          code: 'custom',
          message: `Sum must not exceed ${MAX_SHARE}`,
          path: ['winnerPotShare'],
          inclusive: true,
          input: data.winnerPotShare
        });
      }
    })
  );

export const raffleBasketsSchema = z.object({
  emptyBaskets: z.string()
});

export const raffleSchema = raffleSpecificationsSchema
  .extend(raffleDonationGoalSchema.shape)
  .extend(raffleBasketsSchema.shape);

export type RaffleSpecificationsForm = z.infer<typeof raffleSpecificationsSchema>;
export type RaffleDonationGoalForm = z.infer<typeof raffleDonationGoalSchema>;
export type RaffleBasketsForm = z.infer<typeof raffleBasketsSchema>;
export type RaffleForm = z.infer<typeof raffleSchema>;
