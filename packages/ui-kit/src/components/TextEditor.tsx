import { useEffect, useRef } from 'react';

import {
  AlignCenter,
  AlignJustified,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  List,
  ListNumbers,
  Strikethrough,
  Underline
} from '@ergo-raffle/icons';
import Quill from 'quill';

import { Button } from './Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select';

export type TextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
};

export const TextEditor = ({ value = '', onChange, placeholder = '' }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        placeholder,
        modules: {
          toolbar: '#toolbar'
        }
      });

      quillRef.current.root.innerHTML = value;

      quillRef.current.on('text-change', () => {
        quillRef.current && onChange?.(quillRef.current.root.innerHTML);
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, [onChange, value, placeholder]);

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  const handleAlign = (value: string) => {
    const quill = quillRef.current;
    if (!quill) return;

    quill.format('align', value === 'left' ? false : value);
  };

  const alignIcons = {
    left: () => <AlignLeft />,
    right: () => <AlignRight />,
    center: () => <AlignCenter />,
    justified: () => <AlignJustified />
  };

  return (
    <div className="border-gray-4 border rounded-3xlg">
      <div id="toolbar" className="px-4 py-3 flex items-center gap-x-3">
        <Button variant="plain" size="icon-xs" className="ql-bold">
          <Bold />
        </Button>
        <Button variant="plain" size="icon-xs" className="ql-italic">
          <Italic />
        </Button>
        <Button variant="plain" size="icon-xs" className="ql-underline">
          <Underline />
        </Button>
        <Button variant="plain" size="icon-xs" className="ql-strike">
          <Strikethrough />
        </Button>
        <Select onValueChange={handleAlign} defaultValue="left">
          <SelectTrigger
            variant="plain"
            size="sm"
            showIcon={false}
            className="focus-visible:border-0 px-0 sm:px-0 hover:bg-black-4 hover:text-black-4-foreground size-7 sm:size-8 justify-center"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(alignIcons).map(([key, Icon]) => (
                <SelectItem value={key} key={key}>
                  <Icon />
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="plain" size="icon-xs" className="ql-link">
          <Link />
        </Button>
        <Button variant="plain" size="icon-xs" className="ql-list" value="ordered">
          <ListNumbers />
        </Button>
        <Button variant="plain" size="icon-xs" className="ql-list" value="bullet">
          <List />
        </Button>
      </div>
      <div ref={editorRef} className="min-h-50 border-0 typo-body-md" />
    </div>
  );
};
