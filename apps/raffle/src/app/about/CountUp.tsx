'use client';

import { useEffect, useRef, useState } from 'react';

export type CountUpProps = {
  to: number;
  formatted: string;
  duration?: number;
};

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

export const CountUp = ({ to, formatted, duration = 1600 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const [text, setText] = useState(formatted);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setText(Math.round(easeOutCubic(progress) * to).toLocaleString('en-US'));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            setText('0');
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref}>{text}</span>;
};
