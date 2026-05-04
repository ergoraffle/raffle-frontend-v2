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
  endpoint?: string;
};

export const useUploader = ({
  files: inputFiles = [],
  allowedFileTypes,
  maxFileSize,
  maxNumberOfFiles,
  maxTotalFileSize,
  minFileSize,
  minNumberOfFiles,
  endpoint
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
          autoCropArea: 1.57
        }
      })
      .use(Tus, { endpoint })
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

  const moveFileToFirst = (fileId: string) => {
    const file = uppy.getFile(fileId);
    if (!file?.data) return;

    const filesClone = uppy.getFiles();
    const restFiles = filesClone.filter((f) => f.id !== fileId);

    filesClone.map((f) => uppy.removeFile(f.id));
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file.data as File | Blob
    });

    restFiles.forEach((f) => {
      uppy.addFile({
        name: f.name,
        type: f.type,
        data: f.data as File | Blob
      });
    });
  };

  const upload = async () => {
    const result = await uppy.upload();

    if (!result?.successful) {
      throw new Error(
        `File upload failed: no successful uploads. Failed files: ${
          result?.failed?.map((f) => f.name).join(', ') || 'unknown'
        }`
      );
    }

    return [...uppy.getFiles(), ...result.successful]
      .map((file) => ({
        id: file.id,
        name: file.name,
        url: file.uploadURL ?? ''
      }))
      .filter(
        (file, index, files) => files.findIndex((current) => current.id === file.id) === index
      );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') return;
    return uppy.destroy;
  }, [uppy]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    if (typeof window === 'undefined') return;
    inputFiles.forEach((file) => {
      if (uppy.getFile(file.id)) return;

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
            type: blob.type,
            progress: {
              uploadStarted: 0,
              uploadComplete: true,
              bytesUploaded: blob.size,
              bytesTotal: blob.size,
              percentage: 100,
              complete: true
            },
            uploadURL: file.url
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
    uploading: !!isUploading,
    maxNumberOfFiles,
    moveFileToFirst
  };
};
