import { useEffect, useState } from 'react';

type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
};

const breakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

type BreakpointKey = keyof Breakpoints;

export const useBreakpoint = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const up = (bp: BreakpointKey) => width >= breakpoints[bp];

  const down = (bp: BreakpointKey) => width < breakpoints[bp];

  const between = (min: BreakpointKey, max: BreakpointKey) =>
    width >= breakpoints[min] && width < breakpoints[max];

  return {
    up,
    down,
    between,
    width,
    isSm: between('sm', 'md'),
    isMd: between('md', 'lg'),
    isLg: between('lg', 'xl'),
    isXl: between('xl', '2xl'),
    is2xl: up('2xl'),
    isMobile: down('md')
  };
};
