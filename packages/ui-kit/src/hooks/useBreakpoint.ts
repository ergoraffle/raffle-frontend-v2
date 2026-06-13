import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

type BreakpointKey = keyof typeof breakpoints;

export const useBreakpoint = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const up = (bp: BreakpointKey) => width !== null && width >= breakpoints[bp];

  const down = (bp: BreakpointKey) => width !== null && width < breakpoints[bp];

  const between = (min: BreakpointKey, max: BreakpointKey) =>
    width !== null && width >= breakpoints[min] && width < breakpoints[max];

  return {
    width,
    up,
    down,
    between,
    isSm: between('sm', 'md'),
    isMd: between('md', 'lg'),
    isLg: between('lg', 'xl'),
    isXl: between('xl', '2xl'),
    is2xl: up('2xl'),
    isMobile: width === null ? false : down('md'),
    isReady: width !== null
  };
};
