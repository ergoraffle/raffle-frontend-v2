import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { useFileInput } from '@uppy/react';

export type UploaderBrowseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const UploaderBrowse = ({ children, ...rest }: UploaderBrowseProps) => {
  const fileInput = useFileInput();
  return (
    <div className="item image-uploader-item flex items-start">
      <input
        {...fileInput.getInputProps()}
        tabIndex={-1}
        style={{ width: 0, height: 0, opacity: 0, visibility: 'hidden' }}
      />
      <button {...fileInput.getButtonProps()} {...rest}>
        {children}
      </button>
    </div>
  );
};
