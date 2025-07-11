import type { Metadata } from "next";
import "./globals.css";
import { MiniKitContextProvider } from "@/provider/minikit-provider";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
    generator: 'v0.dev'
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
