import { UppyContextProvider, Thumbnail } from '@uppy/react';

import { UploaderImageEditor } from './UploaderImageEditor';
import { UploaderBrowse } from './UploaderBrowse';
import type { useUploader } from './useUploader';
import type { Body, Meta, UppyFile } from '@uppy/core';

export type UploaderProps = ReturnType<typeof useUploader>;

export const Uploader = ({
  edit,
  editing,
  error,
  files,
  instance,
  ready,
  uploading
}: UploaderProps) => {
  void ready;
  return (
    <UppyContextProvider uppy={instance}>
      <UploaderBrowse className="TODO">click to browse</UploaderBrowse>
      {files.map((file) => {
        const isFileLoading = file.error || (file?.data?.size && file.data.size > 0);

        const isFileUploading = !!file.progress.uploadStarted && !file.progress.uploadComplete;

        const isFileActionsDisabled = isFileUploading || !isFileLoading;

        return (
          <div key={file.id}>
            <Thumbnail
              width="100px"
              height="50px"
              file={file as UppyFile<Meta, Body>}
              images={!!file.data?.size}
            />

            <div>{file.name}</div>

            <div>{file.size}</div>

            {/* TODO: Show a snipper */}
            {!isFileLoading && <div>file is loading</div>}

            {/* TODO: Show an icon on hover that displays the error in a tooltip */}
            {!!file.error && <div>{file.error}</div>}

            {/* TODO: Show uploading spinner */}
            {!!file.progress.uploadStarted && !file.progress.uploadComplete && (
              <div>file is uploading</div>
            )}

            <button
              disabled={isFileActionsDisabled}
              type="button"
              onClick={() => instance.removeFile(file.id)}
            >
              remove
            </button>

            <button disabled={isFileActionsDisabled} type="button" onClick={() => edit(file.id)}>
              edit
            </button>
          </div>
        );
      })}
      {!!editing && <UploaderImageEditor file={editing} onClose={() => edit(undefined)} />}
      {!!uploading && <div>uploading</div>}
      {!!error && <div>{error}</div>}
    </UppyContextProvider>
  );
};
