'use client';

import { ReactNode, useEffect } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Создаём <script type="module">
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/scripts/FarcasterIntegration.js';
    script.onload = async () => {
      await window.farcasterIntegration?.init();
    };
    document.body.appendChild(script);
  }, []);

  return <>{children}</>;
}
