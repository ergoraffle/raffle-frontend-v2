'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

export type RevealProps = {
  children: ReactNode;
  delay?: number;
};

export const Reveal = ({ children, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`about-reveal transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
