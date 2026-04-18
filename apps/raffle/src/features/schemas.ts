import { z } from 'zod';

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

export const raffleDonationGoalSchema = z.object({
  tokenId: z.string({ message: 'Can not be empty, Please select a token' }),
  count: z.string({ message: 'Can not be empty' }),
  amount: z.string({ message: 'Can not be empty' }),
  missionFund: z
    .number({ message: 'Can not be empty' })
    .min(0, 'Can not be less than 0')
    .max(100, 'Can not be more than 100'),
  winnerPotShare: z
    .number({ message: 'Can not be empty' })
    .min(0, 'Can not be less than 0')
    .max(100, 'Can not be more than 100'),
  address: z.string({ message: 'Can not be empty' })
});

export const createRaffleSchema = (serviceShare?: number) => {
  if (!serviceShare) return raffleSchema;
  const MAX = 100 - serviceShare;

  return raffleSchema.superRefine((data, ctx) => {
    if (data.missionFund + data.winnerPotShare > MAX) {
      ctx.addIssue({
        code: 'custom',
        message: `Max allowed is ${MAX}`,
        path: ['missionFund']
      });
    }
  });
};

export const raffleBasketsSchema = z.object({
  emptyBaskets: z.string({ message: 'Can not be empty' }),
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

export const raffleSchema = raffleSpecificationsSchema
  .extend(raffleDonationGoalSchema.shape)
  .extend(raffleBasketsSchema.shape);

export type RaffleSpecificationsForm = z.infer<typeof raffleSpecificationsSchema>;
export type RaffleDonationGoalForm = z.infer<typeof raffleDonationGoalSchema>;
export type RaffleBasketsForm = z.infer<typeof raffleBasketsSchema>;
export type RaffleForm = z.infer<typeof raffleSchema>;
