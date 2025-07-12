"use client"

import { useEffect } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { HorseFactAnalyzer } from "@/components/horse-fact-analyzer"
import { DonationButton } from "@/components/donation-button"   // ⬅️ добавлено
import { Sparkles } from "lucide-react"

// ----- Simple Sparkle component -----
const BgSparkle = ({
  top,
  left,
  size = "w-8 h-8",
  rotate = "0",
  delay = "0s",
}: { top: string; left: string; size?: string; rotate?: string; delay?: string }) => (
  <Sparkles
    className={`absolute text-amber-200/40 ${size} transform rotate-${rotate} animate-pulse`}
    style={{ top, left, animationDelay: delay }}
  />
)

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return (
    <div
      className="relative min-h-screen flex flex-col items-center p-4 pt-8 selection:bg-amber-300 selection:text-amber-900 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #D2B48C, #F5DEB3)", // Tan → wheat
      }}
    >
      {/* Background Sparkles */}
      <BgSparkle top="10%" left="15%" size="w-12 h-12" rotate="12" delay="0.2s" />
      <BgSparkle top="20%" left="80%" size="w-10 h-10" rotate="-15" delay="0.5s" />
      <BgSparkle top="60%" left="5%" size="w-16 h-16" rotate="5" delay="0.8s" />
      <BgSparkle top="75%" left="90%" size="w-14 h-14" rotate="-5" delay="0.3s" />
      <BgSparkle top="40%" left="45%" size="w-8 h-8" rotate="20" delay="0.6s" />

      {/* Themed Header */}
      <header className="relative z-10 w-full max-w-xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-amber-100 border-[4px] border-amber-800 rounded-3xl shadow-[6px_6px_0px_0px_rgba(133,77,14,1)]">
        <div className="text-center sm:text-left">
          <h1 className="ranch-heading text-4xl text-amber-900 leading-tight">Horse Facts & Pics</h1>
          <p className="font-body text-lg text-amber-700 font-medium">Discover amazing horse facts!</p>
        </div>
      </header>

      {/* Main horse fact analyzer component */}
      <div className="relative z-10">
        <HorseFactAnalyzer />
      </div>

      {/* ---- DONATION SECTION ---- */}
      <section className="relative z-10 mt-12 w-full max-w-md">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 border border-amber-200 shadow-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">💝 Support the Creator</h3>
            <p className="text-sm text-amber-700 mb-4">
              Help keep the horse facts coming with Base USDC donations
            </p>
            <DonationButton
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              amount="1000000"      /* 1 USDC */
            />
          </div>
        </div>
      </section>

      <footer className="relative z-10 mt-12 text-center">
        <p className="font-body text-sm text-amber-800">
          Learn something new about these magnificent creatures!
        </p>
      </footer>
    </div>
  )
}
