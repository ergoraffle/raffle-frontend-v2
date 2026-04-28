import { Check, Info } from '@ergo-raffle/icons';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

export const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      success: <Check className="size-4 text-success" />,
      info: <Info className="size-4 text-secondary-1" />,
      warning: <Info className="size-4 text-alert" />,
      error: <Info className="size-4 text-error" />,
      loading: <Info className="size-4 animate-spin" />
    }}
    style={
      {
        '--normal-bg': 'var(--color-background)',
        '--normal-text': 'var(--color-foreground)',
        '--normal-border': 'transparent'
      } as React.CSSProperties
    }
    toastOptions={{
      classNames: {
        toast: 'cn-toast'
      }
    }}
    {...props}
  />
);
