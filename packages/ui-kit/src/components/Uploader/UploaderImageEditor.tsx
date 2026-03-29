import type { Meta, UppyFile } from '@uppy/core';
import { useImageEditor } from '@uppy/react';

import { Dialog, DialogContent } from '@/components';

export type UploaderImageEditorProps = {
  file: UppyFile<Meta, Record<string, never>>;
  onClose: () => void;
};

export const UploaderImageEditor = ({ file, onClose }: UploaderImageEditorProps) => {
  const {
    state,
    getImageProps,
    getSaveButtonProps,
    getCancelButtonProps,
    getRotateButtonProps,
    getFlipHorizontalButtonProps,
    getZoomButtonProps,
    getCropSquareButtonProps,
    getCropLandscapeButtonProps,
    getCropPortraitButtonProps,
    getResetButtonProps,
    getRotationSliderProps
  } = useImageEditor({ file });

  return (
    <Dialog open={!!file} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <div>
          <img {...getImageProps()} />
        </div>
        <label>
          Fine Rotation: {state.angle}°
          <input {...getRotationSliderProps()} />
        </label>
        <button {...getRotateButtonProps(-90)}>↶ -90°</button>
        <button {...getRotateButtonProps(90)}>↷ +90°</button>
        <button {...getFlipHorizontalButtonProps()}>⇆ Flip</button>
        <button {...getZoomButtonProps(0.1)}>+ Zoom</button>
        <button {...getZoomButtonProps(-0.1)}>- Zoom</button>
        <button {...getCropSquareButtonProps()}>1:1</button>
        <button {...getCropLandscapeButtonProps()}>16:9</button>
        <button {...getCropPortraitButtonProps()}>9:16</button>
        <button {...getResetButtonProps()}>Reset</button>
        <button {...getCancelButtonProps({ onClick: onClose })}>Cancel</button>
        <button {...getSaveButtonProps({ onClick: onClose })}>Save</button>
      </DialogContent>
    </Dialog>
  );
};
