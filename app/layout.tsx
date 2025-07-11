import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { MiniKitContextProvider } from "@/provider/minikit-provider";
import { ReactNode, useEffect } from "react";

export const metadata: Metadata = {
  title: "Horse Facts & Pics",
  description:
    "Discover amazing horse facts with beautiful images. Learn fascinating information about these magnificent creatures!",
  generator: "v0.dev",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://v0-powerpuff-girls-ow.vercel.app/horse-banner.png",
      button: {
        title: "Discover Horse Facts",
        action: {
          type: "launch_frame",
          name: "Horse Facts & Pics",
          url: "https://v0-powerpuff-girls-ow.vercel.app",
          splashImageUrl: "https://v0-powerpuff-girls-ow.vercel.app/splash.png",
          splashBackgroundColor: "#8B4513",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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

  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
}
