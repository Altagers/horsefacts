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

    // Fun horse-related emojis and phrases
    const horseEmojis = ["🐴", "🐎", "🦄", "🤠", "🌾"]
    const funnyPhrases = [
      "Giddy up for this fact!",
      "Straight from the horse's mouth:",
      "Neigh-ver knew this before!",
      "Stable genius level knowledge:",
      "Horsing around with facts:",
    ]

    const randomEmoji = horseEmojis[Math.floor(Math.random() * horseEmojis.length)]
    const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)]

    const castText = `${randomEmoji} ${randomPhrase} ${horseFact.fact.substring(0, 120)}${horseFact.fact.length > 120 ? "..." : ""} 

Made by @altagers.eth with @sohey help, powered by MiniKit! 🚀`

    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [sharePageUrl],
      })
      setStatus("idle")
    } catch (error) {
      console.error("❌ Failed to share cast:", error)
      setStatus("error")
      setErrorMessage("Whoa! Our sharing horse stumbled. Try again, partner! 🤠")
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <HorseButton
        onClick={handleShare}
        disabled={status === "loading"}
        className="w-full text-xl transform hover:scale-105 transition-all duration-200"
        sparkles
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">🌪️</span>
            Saddling up the share...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>🚀</span>
            Share This Epic Horse Fact!
          </span>
        )}
      </HorseButton>
      {status === "error" && (
        <p className="text-red-600 font-body mt-2 text-center bg-red-100 p-3 rounded-lg border-2 border-red-300">
          {errorMessage}
        </p>
      )}
      <div className="text-xs text-amber-600 text-center font-body italic">
        "Sharing is caring... and hilarious! 😄"
      </div>
    </div>
  )
}
