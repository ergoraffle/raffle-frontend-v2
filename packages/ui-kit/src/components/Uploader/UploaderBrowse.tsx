import type { ButtonHTMLAttributes, DragEvent, ReactNode } from 'react';

import { useFileInput } from '@uppy/react';

export type UploaderBrowseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  onDrop?: (e: DragEvent<HTMLElement>) => void;
  onDragOver?: (e: DragEvent<HTMLElement>) => void;
};

export const UploaderBrowse = ({ children, className, ...rest }: UploaderBrowseProps) => {
  const fileInput = useFileInput();
  return (
    <>
      <input
        {...fileInput.getInputProps()}
        tabIndex={-1}
        style={{ width: 0, height: 0, opacity: 0, visibility: 'hidden' }}
      />
      <button
        {...fileInput.getButtonProps()}
        {...rest}
        className="flex flex-col items-center justify-center gap-2.5 bg-gray-4 text-gray-4-foreground rounded-xlg cursor-pointer w-full h-full"
      >
        {children}
      </button>
    </>
  );
};
