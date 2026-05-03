import { useFramework } from '@/providers';

import { Typography } from '../Typography';

export const NotFoundError = () => {
  const Image = useFramework().components.Image;
  return (
    <div className="bg-gray-4 text-gray-4-foreground flex flex-col items-center justify-center py-16.5">
      <div className="flex flex-col items-center justify-center max-w-208 aspect-square before:w-full relative before:absolute before:aspect-square before:rounded-full before:bg-gray-3">
        <div className="flex flex-col items-center justify-center relative">
          <Image
            src="/illustrations/notFoundErrorIllustration.svg"
            width={832}
            height={477}
            alt="Server Error"
            className="sm:-mb-10"
          />
          <Typography variant="display-md">404</Typography>
          <Typography variant="heading-3">Nothing seems to be here.</Typography>
          <Typography variant="body-lg" className="max-w-84 text-center">
            The server failed to process this request. Please retry in a moment.
          </Typography>
        </div>
      </div>
    </div>
  );
};
