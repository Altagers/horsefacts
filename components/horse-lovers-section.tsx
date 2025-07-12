"use client"

import { Heart, X } from "lucide-react"
import React from "react"

interface HorseLoversProps {
  isOpen: boolean
  onClose: () => void
}

export function HorseLoversSection({ isOpen, onClose }: HorseLoversProps) {
  if (!isOpen) return null

  const walletAddress = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF"

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      alert("Wallet address copied to clipboard!")
    } catch {
      alert("Failed to copy address. Please copy manually.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-pink-50 via-white to-red-50 border-[4px] border-red-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(153,27,27,1)] relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-red-100 hover:bg-red-200 border-2 border-red-400 transition-colors duration-200 shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-red-700" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="ranch-heading text-xl text-red-700 mb-2 flex items-center justify-center gap-2 flex-wrap">
            <Heart className="w-6 h-6 fill-current animate-pulse text-red-600" />
            Horse Lovers,
            <br />
            Mini-App Supporters
            <Heart className="w-6 h-6 fill-current animate-pulse text-red-600" />
          </h2>
          <div className="flex justify-center gap-1 text-2xl animate-bounce">
            💖💕💗💝💘💖💕💗💝💘
          </div>
        </div>

        {/* Existing content preserved */}
        <div className="space-y-4">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-3 border-red-400 text-center shadow-lg">
            <div className="flex flex-col gap-3">
              <a
                href="https://farcaster.xyz/horsefacts.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <button className="w-full text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-4 border-red-800 shadow-[4px_4px_0px_0px_rgba(127,29,29,1)] hover:shadow-[6px_6px_0px_0px_rgba(127,29,29,1)] group-hover:scale-105 transition-all duration-200 px-6 py-3 rounded-2xl">
                  <span className="flex items-center justify-center gap-2 light-text western-button-text">
                    🐎 @horsefacts.eth 💕
                  </span>
                </button>
              </a>

              <a
                href="https://farcaster.xyz/105108121"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <button className="w-full text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-4 border-red-800 shadow-[4px_4px_0px_0px_rgba(127,29,29,1)] hover:shadow-[6px_6px_0px_0px_rgba(127,29,29,1)] group-hover:scale-105 transition-all duration-200 px-6 py-3 rounded-2xl">
                  <span className="flex items-center justify-center gap-2 light-text western-button-text">
                    🦄 @105108121 💖
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Quote block */}
          <div className="text-center bg-white/80 p-3 rounded-2xl border-2 border-red-300">
            <div className="flex justify-center gap-1 text-xl animate-pulse">
              💝💗💕💖💘💝💗💕💖💘
            </div>
            <p className="font-body text-xs high-contrast-text mt-2 italic font-semibold">
              "Spreading horse love across Farcaster! 🌟"
            </p>
            <div className="flex justify-center gap-1 text-lg mt-1 animate-bounce delay-300">
              ❤️🧡💛💚💙💜🤍💖❤️🧡
            </div>
          </div>

          {/* === Harmonious Donate CTA === */}
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-3 border-red-400 text-center shadow-lg">
            <p className="text-gray-700 mb-2 font-semibold">
              💖 Thank you for supporting HorseFacts! 💖
            </p>
            <button
              onClick={copyAddress}
              className="w-full text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-4 border-red-800 shadow-[4px_4px_0px_0px_rgba(127,29,29,1)] hover:shadow-[6px_6px_0px_0px_rgba(127,29,29,1)] transition-all duration-200 px-6 py-3 rounded-2xl mb-3"
            >
              Donate
            </button>
            <p className="text-sm text-gray-600">
              Send donations to <code className="font-mono">{walletAddress}</code>. Your name will be added to our “Awesome Supporters” list!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
