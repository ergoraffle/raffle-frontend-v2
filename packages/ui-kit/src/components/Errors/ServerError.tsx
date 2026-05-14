import { useFramework } from '@/providers';

import { Typography } from '../Typography';

type ServerError = {
  code?: number;
};

export const ServerError = ({ code = 500 }: ServerError) => {
  const Image = useFramework().components.Image;
  return (
    <div className="flex flex-col items-center justify-center py-16.5">
      <div className="flex flex-col items-center justify-center max-w-208 aspect-square before:w-full relative before:absolute before:aspect-square before:rounded-full before:bg-gray-3">
        <div className="flex flex-col items-center justify-center relative">
          <Image
            src="/illustrations/serverErrorIllustration.svg"
            width={832}
            height={477}
            alt="Server Error"
            className="-mb-5 sm:-mb-10"
          />
          <Typography variant="display-md">{code}</Typography>
          <Typography variant="heading-3">Something went wrong on our end</Typography>
          <Typography variant="body-lg" className="max-w-84 text-center">
            The server failed to process this request. Please retry in a moment.
          </Typography>
        </div>
      </div>
    </div>
  );
};
