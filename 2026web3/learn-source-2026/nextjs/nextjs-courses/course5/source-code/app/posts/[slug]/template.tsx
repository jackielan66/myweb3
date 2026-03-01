'use client';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 触发淡入动画
    setIsMounted(true);
  }, []);

  return (
    <div
      style={{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}