import { useState } from 'react';

import { Close } from '@ergo-raffle/icons';

import { Badge } from './Badge';
import { Button } from './Button';
import { InputGroup, InputGroupAddon, InputGroupInput, type InputGroupProps } from './InputGroup';

export type TagsInputProps = InputGroupProps & {
  tags?: string[];
  onSetTags: (tags: string[] | undefined) => void;
};

export const TagsInput = ({ onSetTags, tags, ...props }: TagsInputProps) => {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const handleAddTag = () => {
    if (tagInputValue && !tags?.includes(tagInputValue)) {
      onSetTags([...(tags ?? []), tagInputValue]);
      setTagInputValue('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags?.filter((t: string) => t !== tag);
    onSetTags(newTags);
  };
  return (
    <>
      <InputGroup variant="bordered" {...props}>
        <InputGroupInput
          value={tagInputValue}
          onChange={(e) => {
            const value = e.target.value;
            setTagInputValue(value);
          }}
          onKeyDown={(e) => {
            const allowed = /^[a-z0-9_-]$/;
            if (e.key.length === 1 && !allowed.test(e.key)) {
              e.preventDefault();
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <InputGroupAddon align="inline-start" className="flex-wrap hidden md:flex">
          {tags?.map((tag) => (
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
        {tags?.map((tag) => (
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
    </>
  );
};
