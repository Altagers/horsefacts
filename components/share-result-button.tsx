"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { HorseButton } from "./horse-button"
import type { HorseFact } from "@/lib/horse-facts"

interface ShareResultButtonProps {
  horseFact: HorseFact
  onReset: () => void
}

export function ShareResultButton({ horseFact, onReset }: ShareResultButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const appBaseUrl = "https://v0-powerpuff-girls-ow.vercel.app"

  const handleShare = async () => {
    setStatus("loading")
    setErrorMessage(null)

    // Construct the URL for the shareable HTML page
    const sharePageUrl = new URL(`/s/${horseFact.id}`, appBaseUrl).toString()

    const castText = `🐴 Horse Fact #${horseFact.id}: ${horseFact.fact.substring(0, 100)}${horseFact.fact.length > 100 ? "..." : ""} Discover more amazing horse facts!`

    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [sharePageUrl],
      })
      setStatus("idle")
    } catch (error) {
      console.error("❌ Failed to share cast:", error)
      setStatus("error")
      setErrorMessage("Failed to open Farcaster composer.")
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <HorseButton onClick={handleShare} disabled={status === "loading"} className="w-full text-xl" sparkles>
        {status === "loading" ? "Preparing Share..." : "Share This Horse Fact!"}
      </HorseButton>
      {status === "error" && <p className="text-red-600 font-body mt-2">{errorMessage}</p>}
    </div>
  )
}
