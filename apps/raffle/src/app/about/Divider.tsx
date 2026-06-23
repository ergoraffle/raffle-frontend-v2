import { Spark } from '@ergo-raffle/icons';

export const Divider = () => (
  <div className="flex items-center justify-center w-full max-w-160 mx-auto">
    <span className="block grow h-px border-t border-transparent [border-image:linear-gradient(-90deg,#E5654C_75.48%,rgba(229,101,76,0.1)_100%)_1]" />
    <Spark className="size-4 text-primary-1 mx-3" />
    <span className="block grow h-px border-t border-transparent [border-image:linear-gradient(90deg,#E5654C_75.48%,rgba(229,101,76,0.1)_100%)_1]" />
  </div>
);
