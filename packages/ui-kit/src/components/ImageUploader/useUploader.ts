import { useEffect, useState } from 'react';

import { type Meta, Uppy, type UppyFile } from '@uppy/core';
import UppyImageEditor from '@uppy/image-editor';
import { useUppyState } from '@uppy/react';
import Tus from '@uppy/tus';

export type UseUploaderProps = {
  files?: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  minFileSize?: number;
  maxTotalFileSize?: number;
  maxNumberOfFiles?: number;
  minNumberOfFiles?: number;
};

export const useUploader = ({
  files: inputFiles = [],
  allowedFileTypes,
  maxFileSize,
  maxNumberOfFiles,
  maxTotalFileSize,
  minFileSize,
  minNumberOfFiles
}: UseUploaderProps = {}) => {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        allowedFileTypes,
        maxFileSize,
        maxNumberOfFiles,
        maxTotalFileSize,
        minFileSize,
        minNumberOfFiles
      }
    })
      .use(UppyImageEditor, {
        cropperOptions: {
          aspectRatio: 1.57,
          viewMode: 1,
          autoCropArea: 1
        }
      })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  );

  const [editing, setEditing] = useState<UppyFile<Meta, Record<string, never>>>();

  const [isUploading, setIsUploading] = useState(false);

  const files = useUppyState(uppy, (state) => Object.values(state.files));

  const isReady = useUppyState(uppy, (state) =>
    Object.values(state.files).every(
      (file) => file.error || (file?.data?.size && file.data.size > 0)
    )
  );

  const error = useUppyState(uppy, (state) => state.error);

  const edit = (id?: string) => {
    const file = files.find((file) => file.id === id);
    setEditing(file);
  };

  const upload = async () => {
    const result = await uppy.upload();

    if (!result?.successful) {
      throw new Error('TODO');
    }

    return result.successful.map((file) => ({
      id: file.id,
      name: file.name,
      url: file.uploadURL
    }));
  };

  useEffect(() => uppy.destroy, [uppy]);

  useEffect(() => {
    const start = () => setIsUploading(true);

    const end = () => setIsUploading(false);

    uppy.on('upload', start);
    uppy.on('complete', end);
    uppy.on('error', end);
    uppy.on('cancel-all', end);

    return () => {
      uppy.off('upload', start);
      uppy.off('complete', end);
      uppy.off('error', end);
      uppy.off('cancel-all', end);
    };
  }, [uppy]);

  useEffect(() => {
    inputFiles.forEach((file) => {
      let id: string;

      try {
        id = uppy.addFile({
          id: file.id,
          name: file.name,
          data: new Blob(),
          preview: file.url
        });
      } catch {
        return;
      }

      fetch(file.url)
        .then((response) => response.blob())
        .then((blob) => {
          uppy.setFileState(id, {
            data: blob,
            size: blob.size,
            type: blob.type
          });
        })
        .catch(() => {
          uppy.setFileState(id, {
            error: 'Failed to load file'
          });
        });
    });
  }, [inputFiles, uppy]);

  return {
    edit,
    editing,
    error,
    files,
    instance: uppy,
    ready: !!isReady,
    upload,
    uploading: !!isUploading
  };
};
