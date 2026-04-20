'use client';

import { useState } from 'react';

import { Close } from '@ergo-raffle/icons';
import {
  Badge,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  TextEditor,
  Typography,
  Uploader,
  useUploader
} from '@ergo-raffle/ui-kit';
import { useFormContext } from 'react-hook-form';

import type { RaffleSpecificationsForm } from '@/features/schemas';
import { formatDuration } from '@/features/utils';

import { FieldTitle } from './FieldTitle';

export type SpecificationsFormProps = {
  handleNext: () => void;
};

export const SpecificationsForm = ({ handleNext }: SpecificationsFormProps) => {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const {
    setValue,
    getValues,
    register,
    watch,
    formState: { errors }
  } = useFormContext<RaffleSpecificationsForm>();
  const images = getValues('images');
  const uploader = useUploader({
    files: images || [],
    maxFileSize: 1024 * (1024 * 1.75),
    allowedFileTypes: ['.jpg', '.png', '.jpeg'],
    maxNumberOfFiles: 4
  });
  const tags = watch('tags');
  const onSubmit = async () => {
    const images = await uploader.upload();
    if (!uploader.uploading) {
      setValue('images', images, {
        shouldDirty: true,
        shouldValidate: true
      });
      handleNext();
    }
  };

  const handleAddTag = () => {
    if (tagInputValue && !tags?.includes(tagInputValue)) {
      setValue('tags', [...(tags ?? []), tagInputValue], {
        shouldValidate: true,
        shouldDirty: true
      });
      setTagInputValue('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags?.filter((t: string) => t !== tag);
    setValue('tags', newTags);
  };

  const deadline = watch('deadline');

  return (
    <div className="space-y-8">
      <Field>
        <FieldTitle title="Set Raffle’s Title/What is the mission of this Raffle?" />
        <Input variant="bordered" className="max-w-205" {...register('name')} />
        {!!errors.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>
      <Field>
        <FieldTitle title="Add a Description for your Raffle" />
        <TextEditor
          className="max-w-205"
          value={getValues('description') || ''}
          onChange={(value) => setValue('description', value as string, { shouldDirty: true })}
        />
        {!!errors.description && <FieldError>{errors.description.message}</FieldError>}
      </Field>
      <Field className="flex-1">
        <FieldLabel>Add up to 5 Tags</FieldLabel>
        <InputGroup variant="bordered">
          <InputGroupInput
            value={tagInputValue}
            onChange={(e) => setTagInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <InputGroupAddon align="inline-start" className="flex-wrap hidden md:flex">
            {getValues('tags')?.map((tag) => (
              <Badge variant="secondary" className="pr-0" key={tag}>
                {tag}
                <Button
                  variant="plain"
                  size="icon-xs"
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Close className="pointer-events-none size-5" />
                </Button>
              </Badge>
            ))}
          </InputGroupAddon>
        </InputGroup>
        <div className="flex md:hidden items-center flex-wrap gap-2">
          {getValues('tags')?.map((tag) => (
            <Badge variant="secondary" className="pr-0" key={tag}>
              {tag}
              <Button
                variant="plain"
                size="icon-xs"
                type="button"
                onClick={() => handleRemoveTag(tag)}
              >
                <Close className="pointer-events-none size-5" />
              </Button>
            </Badge>
          ))}
        </div>
        {!!errors.tags && <FieldError>{errors.tags.message}</FieldError>}
      </Field>
      <Field>
        <FieldTitle title="Add up to 4 Photos" />
        <Uploader {...uploader} />
      </Field>
      <Field>
        <FieldTitle title="Set Raffle’s Deadline." />
        <div className="flex items-center gap-x-5">
          <Input
            variant="bordered"
            className="max-w-205 grow"
            type="number"
            min={0}
            placeholder="Blocks to go"
            {...register('deadline', {
              valueAsNumber: true
            })}
          />
          {!!deadline && (
            <Typography variant="subtitle-lg" className="text-gray-2 whitespace-nowrap">
              ≈ {formatDuration(deadline * 2)}
            </Typography>
          )}
        </div>
        {!!errors.deadline && <FieldError>{errors.deadline.message}</FieldError>}
      </Field>
      <div className="flex items-center justify-end">
        <Button variant="primary" className="w-32.5 sm:w-70" onClick={onSubmit} type="button">
          Next
        </Button>
      </div>
    </div>
  );
};
