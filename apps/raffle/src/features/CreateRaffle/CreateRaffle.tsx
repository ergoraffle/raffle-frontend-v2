'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';

import { raffleSchema } from '../schemas';

export const CreateRaffle = () => {
  const form = useForm({
    resolver: zodResolver(raffleSchema)
  });
  return <Form {...form}>Create Raffle Form</Form>;
};
