"use client";

import { ReactNode, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/FarcasterIntegration.js";
    script.defer = true;
    script.onload = async () => {
      if (window.farcasterIntegration) {
        await window.farcasterIntegration.init();
        await window.farcasterIntegration.notifyAppReady();
      }
    };
    document.body.appendChild(script);
  }, []);

  return <>{children}</>;
}
