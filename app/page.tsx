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
    if (!isFrameReady) {
      setFrameReady()
    }
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
      {/* Фоновые блестки и HorseFactAnalyzer */}
      <main className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
        {/* ...существующий код блёсток и HorseFactAnalyzer */}
        <HorseFactAnalyzer />

        {/* Секция Farcaster-кнопок */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://farcaster.xyz/altagers.eth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
              🐴 @altagers.eth
            </button>
          </a>

          {/* --- Здесь вставляем Donate CTA между @altagers.eth и sohey --- */}
          <div className="flex flex-col items-center">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Donate (copies address)
            </button>
            <div
              onClick={copyToClipboard}
              className="mt-2 inline-flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-lg border border-gray-300 select-all"
            >
              <code className="font-mono text-sm break-all">
                {walletAddress}
              </code>
              <Copy className="w-4 h-4 text-gray-600 hover:text-gray-800" />
            </div>
            {copied && (
              <p className="text-green-600 text-xs mt-1">Address copied!</p>
            )}
            <p className="text-gray-500 text-xs italic mt-1">
              Your name will be immortalized in the “Horse Lovers” list!
            </p>
          </div>

          <a
            href="https://farcaster.xyz/sohey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
              🦄 sohey
            </button>
          </a>
        </div>
      </main>

      {/* Donate-CTA остаётся фиксированной для мобильных при необходимости */}
      {/* Модальное окно со списком Horse Lovers */}
      {showModal && (
        <HorseLoversSection
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
