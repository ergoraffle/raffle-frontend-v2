import { validateAddress } from '@fleet-sdk/core';
import { z } from 'zod';

const raffleSpecificationsSchema = z.object({
  name: z
    .string()
    .nonempty('Can not be empty')
    .min(2, 'Name is too short')
    .max(50, 'Name is too long'),
  description: z.string({ message: 'Can not be empty' }).max(1024, 'Description is too long'),
  tags: z.array(z.string()).max(5, 'Can not be more than 5').optional(),
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        name: z.string()
      })
    )
    .max(4, 'Can not be more than 4')
    .optional(),
  deadline: z
    .number({
      message: 'Can not be empty'
    })
    .min(1, 'Deadline must be at least 1')
});

const raffleDonationGoalSchema = z.object({
  tokenId: z.string({ message: 'Can not be empty, Please select a token' }),
  count: z.number({ message: 'Can not be empty' }).min(0, 'Can not be less than 0'),
  amount: z.number({ message: 'Can not be empty' }).min(0, 'Can not be less than 0'),
  address: z
    .string({ message: 'Can not be empty' })
    .nonempty('Can not be empty')
    .refine(
      (val) => {
        if (!val) return true;
        return validateAddress(val);
      },
      {
        message: 'Invalid address'
      }
    ),
  missionFund: z
    .number({ message: 'Can not be empty' })
    .min(0, 'Can not be less than 0')
    .max(100, 'Can not be more than 100'),
  winnerPotShare: z
    .number({ message: 'Can not be empty' })
    .min(0, 'Can not be less than 0')
    .max(100, 'Can not be more than 100')
});
const raffleBasketsSchema = z.object({
  emptyBaskets: z.number({ message: 'Can not be empty' }),
  details: z
    .array(
      z.object({
        id: z.string({ message: 'Can not be empty' }),
        count: z.number({ message: 'Can not be empty' }).min(1, 'Can not be less than 1'),
        percent: z
          .number({ message: 'Can not be empty' })
          .min(1, 'Can not be less than 1')
          .max(100, 'Can not be more than 100')
      })
    )
    .min(1, 'At least one detail is required')
    .superRefine((items, ctx) => {
      if (items.length === 0) return;

      if (items.some((i) => i.percent === 0)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Percents can not be less than 1',
          path: []
        });
      }
      if (items.some((i) => i.percent > 100)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Percents can not be more than 100',
          path: []
        });
      }
      if (items.some((i) => i.count === 0)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Counts can not be less than 1',
          path: []
        });
      }

      const total = items.reduce((sum, item) => sum + item.percent * item.count, 0);

      if (total !== 100) {
        ctx.addIssue({
          code: 'custom',
          message: 'Sum of percentages must equal 100',
          path: []
        });
      }
    })
});

const raffleAgreementSchema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms'
  }),
  eligibility: z.boolean().refine((val) => val === true, {
    message: 'Please confirm your eligibility to continue.'
  })
});

export const raffleSchema = raffleAgreementSchema
  .and(raffleSpecificationsSchema)
  .and(raffleDonationGoalSchema)
  .and(raffleBasketsSchema);

export const addGiftSchema = z.object({
  winnerIndex: z.number({ message: 'Can not be empty' }),
  tokens: z
    .array(
      z.object({
        tokenId: z.string({ message: 'Can not be empty' }),
        amount: z
          .bigint({
            message: 'Can not be empty'
          })
          .min(0n, 'Can not be less than 0')
      })
    )
    .min(1, 'At least one gift is required')
});

export type RaffleSpecificationsForm = z.infer<typeof raffleSpecificationsSchema>;
export type RaffleDonationGoalForm = z.infer<typeof raffleDonationGoalSchema>;
export type RaffleBasketsForm = z.infer<typeof raffleBasketsSchema>;
export type AddGiftForm = z.infer<typeof addGiftSchema>;
export type RaffleForm = z.infer<typeof raffleSchema>;
