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
      alert("Address copied!")
    } catch {
      alert("Copy failed, please copy manually.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4 overflow-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-100 hover:bg-red-200 rounded-full border-2 border-red-300 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-red-600" />
        </button>

        {/* Заголовок */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-red-700 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            Horse Lovers & Supporters
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
          </h2>
          <div className="mt-2 text-3xl animate-bounce">💖💕💗💝💘</div>
        </div>

        {/* Существующий контент */}
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <div className="space-y-3">
              <a
                href="https://farcaster.xyz/horsefacts.eth"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                  🐎 @horsefacts.eth 💕
                </button>
              </a>
              <a
                href="https://farcaster.xyz/105108121"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                  🦄 @105108121 💖
                </button>
              </a>
            </div>
          </div>

          <div className="text-center bg-red-100 p-3 rounded-xl border border-red-200">
            <div className="text-xl animate-pulse">💝💗💕💖💘</div>
            <p className="italic font-semibold mt-2">"Spreading horse love across Farcaster! 🌟"</p>
            <div className="text-xl mt-1 animate-bounce">❤️🧡💛💚💙💜</div>
          </div>
        </div>

        {/* Donate CTA */}
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center">
          <p className="font-semibold mb-3">💖 Thank you for supporting HorseFacts! 💖</p>
          <button
            onClick={copyAddress}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mb-2"
          >
            Donate
          </button>
          <p className="text-sm text-gray-600">
            Send to <code className="font-mono">{walletAddress}</code><br/>
            Your name joins our Awesome Supporters list!
          </p>
        </div>
      </div>
    </div>
)
}
