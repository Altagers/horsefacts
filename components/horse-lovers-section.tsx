"use client"

import { HorseButton } from "./horse-button"
import { Heart, X } from "lucide-react"

interface HorseLoversProps {
  isOpen: boolean
  onClose: () => void
}

export function HorseLoversSection({ isOpen, onClose }: HorseLoversProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-pink-50 to-red-50 border-[4px] border-red-400 rounded-3xl shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-red-600" />
        </button>

        <div className="text-center mb-6">
          <h2 className="ranch-heading text-xl text-red-600 mb-2 flex items-center justify-center gap-2 flex-wrap">
            <Heart className="w-6 h-6 fill-current animate-pulse" />
            Horse Lovers,
            <br />
            Mini-App Supporters
            <Heart className="w-6 h-6 fill-current animate-pulse" />
          </h2>
          <div className="flex justify-center gap-1 text-2xl animate-bounce">💖💕💗💝💘💖💕💗💝💘</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/80 p-4 rounded-2xl border-2 border-red-300 text-center">
            <div className="flex flex-col gap-3">
              <a
                href="https://farcaster.xyz/horsefacts.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <HorseButton className="w-full text-lg bg-red-400 hover:bg-red-500 border-red-600 shadow-[4px_4px_0px_0px_rgba(185,28,28,1)] hover:shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] group-hover:scale-105 transition-all duration-200">
                  <span className="flex items-center justify-center gap-2">🐎 @horsefacts.eth 💕</span>
                </HorseButton>
              </a>

              <a href="https://farcaster.xyz/105108121" target="_blank" rel="noopener noreferrer" className="group">
                <HorseButton className="w-full text-lg bg-red-400 hover:bg-red-500 border-red-600 shadow-[4px_4px_0px_0px_rgba(185,28,28,1)] hover:shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] group-hover:scale-105 transition-all duration-200">
                  <span className="flex items-center justify-center gap-2">🦄 @105108121 💖</span>
                </HorseButton>
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center gap-1 text-xl animate-pulse">💝💗💕💖💘💝💗💕💖💘</div>
            <p className="font-body text-xs text-red-600 mt-2 italic">"Spreading horse love across Farcaster! 🌟"</p>
            <div className="flex justify-center gap-1 text-lg mt-1 animate-bounce delay-300">❤️🧡💛💚💙💜🤍💖❤️🧡</div>
          </div>
        </div>
      </div>
    </div>
  )
}
