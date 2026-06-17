export const Aurora = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <div className="about-aurora absolute inset-0" />
    <div className="about-dots absolute inset-0" />
    <style>{`
      .about-aurora {
        background:
          radial-gradient(62rem 40rem at 50% -8%, color-mix(in oklch, var(--color-primary-1) 14%, transparent), transparent 62%),
          radial-gradient(50rem 36rem at 50% 48%, color-mix(in oklch, var(--color-secondary-1) 8%, transparent), transparent 60%),
          radial-gradient(56rem 38rem at 50% 108%, color-mix(in oklch, var(--color-primary-4) 12%, transparent), transparent 62%);
        background-repeat: no-repeat;
        will-change: transform;
      }
      .about-dots {
        background-image: radial-gradient(color-mix(in oklch, var(--color-primary-1) 32%, transparent) 1px, transparent 1.6px);
        background-size: 26px 26px;
        opacity: 0.05;
        -webkit-mask-image: radial-gradient(70% 55% at 50% 32%, #000, transparent 82%);
        mask-image: radial-gradient(70% 55% at 50% 32%, #000, transparent 82%);
      }
      @keyframes about-aurora-drift {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(1.5%, 2%, 0) scale(1.04); }
      }
      @keyframes about-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      @media (prefers-reduced-motion: no-preference) {
        .about-aurora { animation: about-aurora-drift 26s ease-in-out infinite; }
        .about-float { animation: about-float 6s ease-in-out infinite; }
      }
    `}</style>
  </div>
);
