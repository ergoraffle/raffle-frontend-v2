import { Moon, Sun } from '@ergo-raffle/icons';

import { useTheme } from '@/hooks';

import { Button } from './Button';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <Button
      variant="primary-soft"
      size="icon"
      className={className}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
