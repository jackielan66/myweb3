'use client';

import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';

export default function Layout({children}: {children: ReactNode}) {
  const [fontPhase, setFontPhase] = useState<'fallback' | 'webfont'>('fallback');

  useEffect(() => {
    const id = window.setTimeout(() => setFontPhase('webfont'), 1800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div data-font-phase={fontPhase}>
      <style>{`
        [data-font-phase="fallback"] {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        }
        [data-font-phase="fallback"] h1 {
          line-height: 1.22;
          letter-spacing: -0.01em;
        }

        [data-font-phase="webfont"] {
          font-family: "Playfair Display", serif;
        }
        [data-font-phase="webfont"] h1 {
          line-height: 1.02;
          letter-spacing: -0.03em;
        }
      `}</style>
      {children}
    </div>
  );
}