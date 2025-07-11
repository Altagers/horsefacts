import type { Metadata } from 'next';
import './globals.css';
import { MiniKitContextProvider } from '@/provider/minikit-provider';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Horse Facts & Pics',
  description: 'Discover amazing horse facts with beautiful images.',
  generator: 'v0.dev',
  other: {
    'fc:frame': JSON.stringify({ /* ...your frame config... */ }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MiniKitContextProvider>
          <ClientLayout>{children}</ClientLayout>
        </MiniKitContextProvider>
      </body>
    </html>
  );
}
