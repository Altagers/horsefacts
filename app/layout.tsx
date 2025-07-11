import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { MiniKitContextProvider } from "@/provider/minikit-provider";

export const metadata: Metadata = {
  title: "Horse Facts & Pics",
  description: "Discover amazing horse facts with beautiful images. Learn fascinating information about these magnificent creatures!",
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
  return (
    <html lang="en">
      <head>
        {/* Farcaster SDK через CDN */}
        <script src="https://sdk.farcaster.xyz/v0.11.1/farcaster-sdk.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.isMiniApp = true;
              console.log('Farcaster SDK loaded');
            `,
          }}
        />
      </head>
      <body>
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
}
