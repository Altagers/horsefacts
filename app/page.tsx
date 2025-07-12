"use client";

import { useEffect, useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { HorseFactAnalyzer } from "@/components/horse-fact-analyzer";
import { HorseLoversSection } from "@/components/horse-lovers-section";
import { Copy } from "lucide-react";

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const walletAddress = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF";
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [setFrameReady, isFrameReady]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <HorseFactAnalyzer />

      {/* Секция Horse Lovers & Supporters */}
      <HorseLoversSection isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* 🚀 Donate: Support HorseFacts */}
      <div className="my-6 p-4 bg-amber-50 rounded-lg text-center">
        <h2 className="text-lg font-semibold">💖 Support HorseFacts 💖</h2>
        <div className="mt-2 flex justify-center items-center gap-2">
          <code className="bg-gray-100 p-1 rounded">{walletAddress}</code>
          <button onClick={copyToClipboard} className="text-sky-600 hover:underline">
            <Copy size={16} />
          </button>
        </div>
        {copied && <p className="mt-1 text-sm text-green-600">Address copied!</p>}
        <p className="mt-1 text-sm">
          Your name will be immortalized in the “Horse Lovers” list!
        </p>
      </div>

      <p className="mt-8 text-xs text-gray-500">
        Made by @altagers.eth with @sohey help • Powered by MiniKit
      </p>
    </>
  );
}
