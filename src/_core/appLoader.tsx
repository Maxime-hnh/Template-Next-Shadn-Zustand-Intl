'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/_lib/utils';

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 5000);
    const check = () => {
      if (document.body.classList.contains('theme-loaded')) {
        clearTimeout(timeout);
        setReady(true);
      } else {
        setTimeout(check, 10);
      }
    };
    check();
    return () => clearTimeout(timeout);
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050709]">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('animate-fade-in')}>
      {children}
    </div>
  );
}
