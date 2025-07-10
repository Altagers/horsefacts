"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { HorseFact } from "@/lib/horse-facts"
import Image from "next/image"
import { HorseButton } from "./horse-button"
import { ShareResultButton } from "./share-result-button"

const HorseHeaderImage = () => (
  <div className="flex justify-center mb-6">
    <div>
      <Image
        src="/horse-banner.png"
        alt="Horse Facts & Pics"
        width={320}
        height={160}
        className="object-cover rounded-2xl border-4 border-amber-800 shadow-lg"
        priority
      />
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

  const handleAnalyze = async () => {
    const userFid = context?.user?.fid

    if (!userFid) {
      setError("Please connect your Farcaster account to discover horse facts.")
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
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ResultScreen result={result} onReset={() => setResult(null)} />
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <HorseHeaderImage />
      <div className="relative bg-amber-100 border-[5px] border-amber-800 rounded-[40px] p-6 pt-8 text-center shadow-[8px_8px_0px_0px_rgba(133,77,14,1)]">
        <h1 className="font-heading text-5xl md:text-6xl leading-none text-amber-900 mb-8 relative font-bold">
          Discover
          <br />
          Amazing
          <br />
          Horse Facts!
        </h1>
        <HorseButton
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          className="w-full text-xl"
          sparkles
        >
          {loading ? "Finding Facts..." : !context?.user?.fid ? "Connect Wallet to Discover" : "Get Horse Fact!"}
        </HorseButton>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-red-400 border-4 border-red-800 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(153,27,27,1)]">
          <p className="text-white font-heading text-xl font-bold">{error}</p>
        </div>
      )}
    </div>
  )
}

function ResultScreen({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 flex flex-col items-center">
      <HorseButton className="mb-8 w-full md:w-auto text-2xl" disabled sparkles>
        Horse Fact #{result.horseFact.id}! 🐴
      </HorseButton>

      <div className="mb-8 bg-white p-3 border-[5px] border-amber-800 rounded-3xl shadow-[6px_6px_0px_0px_rgba(133,77,14,1)]">
        <Image
          src={result.horseFact.image || "/placeholder.svg"}
          alt={`Horse Fact ${result.horseFact.id}`}
          width={280}
          height={280}
          className="rounded-2xl object-cover"
        />
      </div>

      <div className="relative bg-white border-[5px] border-amber-800 rounded-3xl p-6 w-full mb-10 text-center shadow-[6px_6px_0px_0px_rgba(133,77,14,1)]">
        <p className="text-lg font-body font-semibold text-amber-900 leading-relaxed">{result.horseFact.fact}</p>
        <div className="absolute left-1/2 -bottom-[19px] transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-amber-800" />
        <div className="absolute left-1/2 -bottom-[14px] transform -translate-x-1/2 w-0 h-0 border-l-[17px] border-l-transparent border-r-[17px] border-r-transparent border-t-[17px] border-t-white" />
      </div>

      <ShareResultButton horseFact={result.horseFact} onReset={onReset} />
    </div>
  )
}
