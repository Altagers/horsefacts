"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { HorseFact } from "@/lib/horse-facts"
import Image from "next/image"
import { HorseButton } from "./horse-button"
import { ShareResultButton } from "./share-result-button"
import { HorseLoversSection } from "./horse-lovers-section"
import { Heart, Brain, Search, Zap } from "lucide-react"

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

// Random slogans for the analyzer
const randomSlogans = [
  "Lightning fast & always free! ⚡",
  "Instant results, no waiting! 🚀",
  "Fast, fun & totally free! 🎉",
  "Quick analysis, pure magic! ✨",
  "Speedy matching, horse approved! 🐴",
  "Zero delays, maximum fun! 💫",
  "Blazing fast horse wisdom! 🔥",
  "Smart matching, zero costs! 💡",
  "Rapid results, endless joy! 🌟",
  "Swift analysis, cowboy style! 🤠",
  "Turbo-charged fact finding! 🏎️",
  "Warp speed wisdom delivery! 🛸",
]

// Get a random slogan
const getRandomSlogan = () => {
  return randomSlogans[Math.floor(Math.random() * randomSlogans.length)]
}

type AnalysisResult = {
  horseFact: HorseFact
  message: string
  analysis: {
    postsAnalyzed: number
    userName: string
    method: "keyword-analysis" | "random"
  }
}

export function HorseFactAnalyzer() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHorseLovers, setShowHorseLovers] = useState(false)
  const [currentSlogan] = useState(getRandomSlogan()) // Set once when component mounts

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

    console.log(`Frontend: Analyzing posts for FID: ${userFid}`)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid: userFid }),
      })
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || "Failed to analyze posts")
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
      <div className="relative bg-gradient-to-br from-white via-amber-50 to-amber-100 border-[5px] border-amber-800 rounded-[40px] p-6 pt-8 text-center shadow-[8px_8px_0px_0px_rgba(133,77,14,1)] hover:shadow-[12px_12px_0px_0px_rgba(133,77,14,1)] transition-all duration-300">
        <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
        <div className="absolute top-4 left-4 text-2xl animate-pulse delay-500">🌟</div>

        <h1 className="ranch-heading text-4xl md:text-5xl leading-none mb-4 relative">
          Smart Horse
          <br />
          <span className="text-amber-800">Fact Analyzer</span>
          <br />
          🧠🐴
        </h1>

        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border-3 border-amber-700 mb-6 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-800" />
            <span className="western-bold text-amber-900 text-sm">KEYWORD-POWERED ANALYSIS</span>
            <Search className="w-5 h-5 text-amber-800" />
          </div>
          <p className="font-body text-sm high-contrast-text leading-relaxed">
            We analyze your last 10 posts using smart keyword matching to find the perfect horse fact! 🎯
          </p>
        </div>

        <p className="font-body text-lg text-amber-800 font-semibold mb-8 italic">"{currentSlogan}"</p>

        <HorseButton
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          className="w-full text-xl transform hover:scale-105 transition-all duration-200 mb-4"
          sparkles
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 animate-pulse" />
              Analyzing your posts...
            </span>
          ) : !context?.user?.fid ? (
            "🔗 Connect Wallet to Analyze"
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Analyze My Posts!
            </span>
          )}
        </HorseButton>

        {/* Horse Lovers Button */}
        <button
          onClick={() => setShowHorseLovers(true)}
          className="w-full mb-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white western-button-text text-sm rounded-xl border-3 border-red-700 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)] hover:shadow-[5px_5px_0px_0px_rgba(153,27,27,1)] transition-all duration-200 transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2 light-text">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
            Horse Lovers & Supporters
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </span>
        </button>

        <div className="mt-4 text-xs font-body bg-white/80 p-2 rounded-lg border border-amber-600">
          <span className="high-contrast-text">
            Made by{" "}
            <a
              href="https://farcaster.xyz/altagers.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 hover:text-amber-800 underline font-bold transition-colors duration-200"
            >
              @altagers.eth
            </a>{" "}
            with{" "}
            <a
              href="https://farcaster.xyz/sohey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 hover:text-amber-800 underline font-bold transition-colors duration-200"
            >
              @sohey
            </a>{" "}
            help • Powered by MiniKit
          </span>
        </div>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-500 to-red-600 border-4 border-red-800 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(153,27,27,1)] animate-shake">
          <p className="light-text western-bold text-lg flex items-center justify-center gap-2">
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
    "Howdy Awesome! 🐴",
    "Well Howdy Partner! 🤠",
    "Yeehaw Amazing! 🏠",
    "Giddy Up Genius! 🤓",
    "Howdy Fantastic! 💫",
  ]

  const randomReaction = funnyReactions[Math.floor(Math.random() * funnyReactions.length)]

  const getAnalysisMessage = () => {
    if (result.analysis.method === "keyword-analysis") {
      return `🎯 Analyzed ${result.analysis.postsAnalyzed} posts from @${result.analysis.userName}`
    }
    return "🎲 Random selection (no recent posts found)"
  }

  const getAnalysisIcon = () => {
    if (result.analysis.method === "keyword-analysis") {
      return <Zap className="w-5 h-5 text-blue-700" />
    }
    return <span className="text-blue-700">🎲</span>
  }

  const getAnalysisTitle = () => {
    if (result.analysis.method === "keyword-analysis") {
      return "KEYWORD ANALYSIS RESULT"
    }
    return "RANDOM SELECTION"
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 flex flex-col items-center">
      <HorseButton className="mb-4 w-full md:w-auto text-2xl animate-pulse" disabled sparkles>
        {randomReaction} Fact #{result.horseFact.id}!
      </HorseButton>

      {/* Analysis Info with better contrast */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-600 rounded-2xl p-4 w-full text-center shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
        <div className="flex items-center justify-center gap-2 mb-2">
          {getAnalysisIcon()}
          <span className="western-bold text-blue-900 text-sm">{getAnalysisTitle()}</span>
        </div>
        <p className="font-body text-sm text-blue-800 font-semibold">{getAnalysisMessage()}</p>
      </div>

      <div className="mb-8 bg-white p-3 border-[5px] border-amber-800 rounded-3xl shadow-[6px_6px_0px_0px_rgba(133,77,14,1)] hover:shadow-[10px_10px_0px_0px_rgba(133,77,14,1)] transition-all duration-300 transform hover:scale-105 relative">
        <Image
          src={result.horseFact.image || "/placeholder.svg"}
          alt={`Horse Fact ${result.horseFact.id}`}
          width={280}
          height={280}
          className="rounded-2xl object-cover"
        />
        <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 rounded-full w-8 h-8 flex items-center justify-center western-bold text-sm border-3 border-amber-800 shadow-lg">
          #{result.horseFact.id}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-white to-amber-50 border-[5px] border-amber-800 rounded-3xl p-6 w-full mb-6 text-center shadow-[6px_6px_0px_0px_rgba(133,77,14,1)]">
        <div className="absolute top-2 right-2 text-xl">🤯</div>
        <p className="text-lg font-body font-bold text-amber-900 leading-relaxed mb-4 high-contrast-text">
          {result.horseFact.fact}
        </p>
        <div className="text-sm western-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border-2 border-amber-600">
          {result.analysis.method === "keyword-analysis" ? "Matched to your interests! 🎯" : "Mind = Blown! 🤯"}
        </div>
        <div className="absolute left-1/2 -bottom-[19px] transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-amber-800" />
        <div className="absolute left-1/2 -bottom-[14px] transform -translate-x-1/2 w-0 h-0 border-l-[17px] border-l-transparent border-r-[17px] border-r-transparent border-t-[17px] border-t-white" />
      </div>

      <ShareResultButton horseFact={result.horseFact} onReset={onReset} />

      {/* Horse Lovers Button in results with better contrast */}
      <button
        onClick={() => setShowHorseLovers(true)}
        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white western-button-text text-sm rounded-xl border-3 border-red-700 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)] hover:shadow-[5px_5px_0px_0px_rgba(153,27,27,1)] transition-all duration-200 transform hover:scale-105"
      >
        <span className="flex items-center justify-center gap-2 light-text">
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
