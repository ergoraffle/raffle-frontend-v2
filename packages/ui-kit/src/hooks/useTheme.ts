import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const setThemeCookie = (theme: 'light' | 'dark') => {
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
  };
  useEffect(() => {
    const html = document.documentElement;
    const cookieTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1] as 'light' | 'dark' | undefined;

    const initialTheme =
      cookieTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.classList.remove('light', 'dark');
    html.classList.add(initialTheme);
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    setThemeCookie(newTheme);
  };

  return [theme, toggleTheme] as const;
};
