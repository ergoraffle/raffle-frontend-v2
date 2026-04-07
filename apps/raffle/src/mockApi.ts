import type {
  RaffleBasketsForm,
  RaffleDonationGoalForm,
  RaffleSpecificationsForm
} from '@/features/schemas';

export const createSpecificationForm = async (data: RaffleSpecificationsForm) => data;
export const createDonationGoalForm = async (data: RaffleDonationGoalForm) => data;
export const createBasketForm = async (data: RaffleBasketsForm) => data;
