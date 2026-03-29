'use client';

import { Uploader, useUploader } from '@ergo-raffle/ui-kit';

const files = [
  {
    id: 'uppy-0e1a5e61/9b5a/45e0/9051/55051a1b2965/png-1d-1d-1d-1d-1e-image/png-648787-1746544379844',
    name: '0e1a5e61-9b5a-45e0-9051-55051a1b2965.png',
    url: 'https://tusd.tusdemo.net/files/ee4617968a6c9b1392af8dbd4ddb31d1+O8_CY1jdyWiB29uRSxn5yrWYr2iWR2u3dj.j5mJBFFE907x61XeC3C14UALUxeABmk918869o9jDQ79lJICoZ7ofvrks2BQ0w01mBp1eAWjYMdH.SfCwqtjCuolAZ0q5'
  },
  {
    id: 'uppy-20250511/133015/jpg-2v-1e-image/jpeg-3635517-1746958969127',
    name: '20250511_133015.jpg',
    url: 'https://tusd.tusdemo.net/files/059545aeb8e35751045a84dffe084129+ApQq0oIt060ku8aWXCcaj4MROacgOkthZEqzuotQBWPL6pRmX3m93gxG9xuyLhgJn1ZCCMj5wgWVrWslB9jI14iyYb4onk07OvFRN1wxIZfLxO6JzC9.29LejvsB4hzp'
  }
];

const Home = () => {
  const uploader = useUploader({ 
    files,
    maxFileSize: 1024 * 1024,
    allowedFileTypes: ['.jpg']
  });
  return (
    <>
      <Uploader {...uploader} />
      <button
        disabled={!uploader.ready}
        type="button"
        onClick={async () => {
          const files = await uploader.upload();
          console.log('files', files);
        }}
      >
        upload
      </button>
    </>
  );
};

export default Home;
