"use client"

import type { ReactNode } from "react"
import { MiniKitProvider } from "@coinbase/onchainkit/minikit"
import { base } from "wagmi/chains"

export function MiniKitContextProvider({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "horse-theme",
          name: "Horse Facts & Pics",
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      {children}
    </MiniKitProvider>
  )
}
