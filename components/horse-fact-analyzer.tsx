"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { HorseFact } from "@/lib/horse-facts"
import Image from "next/image"
import { HorseButton } from "./horse-button"
import { ShareResultButton } from "./share-result-button"
import { HorseLoversSection } from "./horse-lovers-section"
import { Heart } from "lucide-react"

const HorseHeaderImage = () => (
  <div className="flex justify-center mb-6">
    <div className="relative">
      <Image
        src="/horse-banner.png"
        alt="Horse Facts & Pics"
        width={320}
        height={160}
        className="object-cover rounded-2xl border-4 border-amber-800 shadow-lg transform hover:scale-105 transition-transform duration-300"
        priority
      />
      <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🐴</div>
    </div>
  </div>
)

type AnalysisResult = {
  horseFact: HorseFact
  message: string
}

export function HorseFactAnalyzer() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHorseLovers, setShowHorseLovers] = useState(false)

  const handleAnalyze = async () => {
    const userFid = context?.user?.fid

    if (!userFid) {
      setError("Whoa there, partner! 🤠 Connect your Farcaster account to unlock the stable of horse wisdom!")
      setLoading(false)
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    console.log(`Frontend: Fetching horse fact for FID: ${userFid}`)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid: userFid }),
      })
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || "Failed to fetch horse fact")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Oops! Our horses are taking a hay break 🌾")
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <ResultScreen
        result={result}
        onReset={() => setResult(null)}
        showHorseLovers={showHorseLovers}
        setShowHorseLovers={setShowHorseLovers}
      />
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <HorseHeaderImage />
      <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 border-[5px] border-amber-800 rounded-[40px] p-6 pt-8 text-center shadow-[8px_8px_0px_0px_rgba(133,77,14,1)] hover:shadow-[12px_12px_0px_0px_rgba(133,77,14,1)] transition-all duration-300">
        <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
        <div className="absolute top-4 left-4 text-2xl animate-pulse delay-500">🌟</div>

        <h1 className="ranch-heading text-4xl md:text-5xl leading-none text-amber-900 mb-4 relative">
          Saddle Up for
          <br />
          <span className="text-amber-700">Amazing</span>
          <br />
          Horse Facts!
        </h1>

        <p className="font-body text-lg text-amber-700 mb-8 italic">"Neigh-ver a dull moment!" 🐎</p>

        <HorseButton
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          className="w-full text-xl transform hover:scale-105 transition-all duration-200 mb-4"
          sparkles
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🌪️</span>
              Galloping to the facts...
            </span>
          ) : !context?.user?.fid ? (
            "🔗 Connect Wallet to Discover"
          ) : (
            "🎯 Get My Horse Fact!"
          )}
        </HorseButton>

        {/* Horse Lovers Button */}
        <button
          onClick={() => setShowHorseLovers(true)}
          className="w-full mb-4 px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white font-body font-semibold rounded-xl border-2 border-red-500 shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] hover:shadow-[5px_5px_0px_0px_rgba(185,28,28,1)] transition-all duration-200 transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
            Horse Lovers & Supporters
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </span>
        </button>

        <div className="mt-4 text-xs text-amber-600 font-body">
          Made by{" "}
          <a
            href="https://farcaster.xyz/altagers.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 hover:text-amber-900 underline font-semibold transition-colors duration-200"
          >
            @altagers.eth
          </a>{" "}
          with{" "}
          <a
            href="https://farcaster.xyz/sohey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 hover:text-amber-900 underline font-semibold transition-colors duration-200"
          >
            @sohey
          </a>{" "}
          help • Powered by MiniKit
        </div>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-400 to-red-500 border-4 border-red-800 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(153,27,27,1)] animate-shake">
          <p className="text-white font-heading text-xl font-bold flex items-center justify-center gap-2">
            <span>🚫</span>
            {error}
          </p>
        </div>
      )}

      {/* Horse Lovers Modal */}
      <HorseLoversSection isOpen={showHorseLovers} onClose={() => setShowHorseLovers(false)} />
    </div>
  )
}

function ResultScreen({
  result,
  onReset,
  showHorseLovers,
  setShowHorseLovers,
}: {
  result: AnalysisResult
  onReset: () => void
  showHorseLovers: boolean
  setShowHorseLovers: (show: boolean) => void
}) {
  const funnyReactions = [
    "Holy horseshoes! 🐴",
    "Well, I'll be a horse's uncle! 🤠",
    "That's some stable knowledge! 🏠",
    "Giddy up, smarty pants! 🤓",
    "Mane-ly awesome! 💫",
  ]

  const randomReaction = funnyReactions[Math.floor(Math.random() * funnyReactions.length)]

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 flex flex-col items-center">
      <HorseButton className="mb-8 w-full md:w-auto text-2xl animate-pulse ranch-heading" disabled sparkles>
        {randomReaction} Fact #{result.horseFact.id}!
      </HorseButton>

      <div className="mb-8 bg-white p-3 border-[5px] border-amber-800 rounded-3xl shadow-[6px_6px_0px_0px_rgba(133,77,14,1)] hover:shadow-[10px_10px_0px_0px_rgba(133,77,14,1)] transition-all duration-300 transform hover:scale-105 relative">
        <Image
          src={result.horseFact.image || "/placeholder.svg"}
          alt={`Horse Fact ${result.horseFact.id}`}
          width={280}
          height={280}
          className="rounded-2xl object-cover"
        />
        <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-amber-800">
          #{result.horseFact.id}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-white to-amber-50 border-[5px] border-amber-800 rounded-3xl p-6 w-full mb-6 text-center shadow-[6px_6px_0px_0px_rgba(133,77,14,1)]">
        <div className="absolute top-2 right-2 text-xl">🤯</div>
        <p className="text-lg font-body font-semibold text-amber-900 leading-relaxed mb-4">{result.horseFact.fact}</p>
        <div className="text-sm text-amber-600 italic">"Mind = Blown! 🤯"</div>
        <div className="absolute left-1/2 -bottom-[19px] transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-amber-800" />
        <div className="absolute left-1/2 -bottom-[14px] transform -translate-x-1/2 w-0 h-0 border-l-[17px] border-l-transparent border-r-[17px] border-r-transparent border-t-[17px] border-t-white" />
      </div>

      <ShareResultButton horseFact={result.horseFact} onReset={onReset} />

      {/* Horse Lovers Button in results */}
      <button
        onClick={() => setShowHorseLovers(true)}
        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white font-body font-semibold rounded-xl border-2 border-red-500 shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] hover:shadow-[5px_5px_0px_0px_rgba(185,28,28,1)] transition-all duration-200 transform hover:scale-105"
      >
        <span className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-current animate-pulse" />
          Horse Lovers & Supporters
          <Heart className="w-4 h-4 fill-current animate-pulse" />
        </span>
      </button>

      {/* Horse Lovers Modal */}
      <HorseLoversSection isOpen={showHorseLovers} onClose={() => setShowHorseLovers(false)} />
    </div>
  )
}
