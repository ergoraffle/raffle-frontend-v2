const THEME_KEY = 'theme';

export type Theme = 'light' | 'dark';

export const getInitialTheme = (): Theme => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) return 'dark';
  if (html.classList.contains('light')) return 'light';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = (): Theme => {
  const html = document.documentElement;
  const current = html.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
};
