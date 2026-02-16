import { useEffect, useState } from 'react';

import { Moon, Sun } from '@ergo-raffle/icons';

import { Button } from '../Button';
import { applyTheme, getInitialTheme, type Theme, toggleTheme } from './themeHelpers';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <Button
      variant="primary-soft"
      size="icon"
      className={className}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
