"use client"

import { useEffect, useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { HorseFactAnalyzer } from "@/components/horse-fact-analyzer"
import { HorseLoversSection } from "@/components/horse-lovers-section"
import { Copy } from "lucide-react"

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()
  const walletAddress = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF"
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isFrameReady) setFrameReady()
  }, [setFrameReady, isFrameReady])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert("Copy failed, please copy manually.")
    }
  }

  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
        {/* Основной анализатор фактов */}
        <HorseFactAnalyzer />

        {/* Секция Horse Lovers & Supporters */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-lg"
          >
            💖 Horse Lovers & Supporters 💖
          </button>
        </div>

        {/* === Блок Donate (перенесён сюда) === */}
        <div className="mt-6 flex flex-col items-center bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-md w-full max-w-sm mx-auto">
          <p className="font-semibold mb-2">💖 Support HorseFacts 💖</p>
          <button
            onClick={copyToClipboard}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-2"
          >
            Donate (copies address)
          </button>
          <div
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 cursor-pointer bg-gray-100 px-3 py-1 rounded-lg border border-gray-300 select-all mb-2 break-all"
          >
            <code className="font-mono text-sm">{walletAddress}</code>
            <Copy className="w-4 h-4 text-gray-600 hover:text-gray-800" />
          </div>
          {copied && <p className="text-green-600 text-sm mb-1">Address copied!</p>}
          <p className="text-xs text-gray-500 italic">
            Your name will be immortalized in the “Horse Lovers” list!
          </p>
        </div>

      </main>
      )}
    </>
  )
}
