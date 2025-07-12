"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { Heart, Coins } from "lucide-react"

const DONATION_ADDRESS = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF"

export function FeedDucksButton() {
  const { context } = useMiniKit()
  const [isLoading, setIsLoading] = useState(false)

  const handleFeedDucks = async () => {
    if (!context?.user?.fid) {
      alert("Please connect your Farcaster wallet first! 🦆")
      return
    }

    setIsLoading(true)

    try {
      // Use MiniKit to initiate a transaction
      const result = await window.MiniKit?.wallet?.sendTransaction({
        to: DONATION_ADDRESS,
        value: "0.001", // Default 0.001 ETH
        data: "0x", // Empty data for simple transfer
      })

      if (result) {
        alert("Thank you for feeding the ducks! 🦆💙 Your kindness makes the world better!")
      }
    } catch (error) {
      console.error("Transaction failed:", error)
      alert("Oops! The ducks are taking a swim break. Try again later! 🦆")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleFeedDucks}
      disabled={isLoading || !context?.user?.fid}
      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white western-button-text text-sm rounded-xl border-3 border-blue-700 shadow-[3px_3px_0px_0px_rgba(29,78,216,1)] hover:shadow-[5px_5px_0px_0px_rgba(29,78,216,1)] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="flex items-center justify-center gap-2 light-text">
        {isLoading ? (
          <>
            <Coins className="w-4 h-4 animate-spin" />
            Feeding Ducks...
          </>
        ) : (
          <>
            <span className="text-lg">🦆</span>
            Feed the Ducks
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </>
        )}
      </span>
    </button>
  )
}
