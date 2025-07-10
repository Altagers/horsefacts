import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MiniKitProvider } from "@/provider/minikit-provider"
import { WagmiProviderWrapper } from "@/provider/wagmi-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TAGLINE || "Horse Facts & Pics",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Discover amazing horse facts matched to your interests!",
  icons: {
    icon: process.env.NEXT_PUBLIC_APP_ICON || "/horse-logo.png",
  },
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_OG_TITLE || "Horse Facts & Pics",
    description: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || "Smart horse fact analyzer powered by AI",
    images: [
      {
        url: process.env.NEXT_PUBLIC_APP_OG_IMAGE || "/horse-banner.png",
        width: 1200,
        height: 630,
        alt: "Horse Facts & Pics",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <WagmiProviderWrapper>
            <MiniKitProvider>{children}</MiniKitProvider>
          </WagmiProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
