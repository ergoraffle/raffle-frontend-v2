import type { Meta, UppyFile } from '@uppy/core';

import { useBreakpoint } from '@/hooks';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../Sheet';
import { ImageEditor } from './ImageEditor';

export type ImageEditorDialogProps = {
  file: UppyFile<Meta, Record<string, never>>;
  onClose: () => void;
};

export const ImageEditorDialog = ({ file, onClose }: ImageEditorDialogProps) => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <Sheet open={!!file} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Image</SheetTitle>
        </SheetHeader>
        <ImageEditor file={file} onCancel={onClose} />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={!!file} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <ImageEditor file={file} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};
