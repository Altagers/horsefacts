"use client";

import { useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import type { HorseFact } from "@/lib/horse-facts";
import Image from "next/image";
import { HorseButton } from "./horse-button";
import { ShareResultButton } from "./share-result-button";
import { HorseLoversSection } from "./horse-lovers-section";
import { Heart, Brain, Search, Zap, Copy } from "lucide-react";

export function HorseFactAnalyzer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HorseFact | null>(null);
  const [showHorseLovers, setShowHorseLovers] = useState(false);

  const handleAnalyze = async () => {
    // ваш existing logic
  };

  if (result) {
    return (
      <ResultScreen
        result={result}
        onReset={() => setResult(null)}
        showHorseLovers={showHorseLovers}
        setShowHorseLovers={setShowHorseLovers}
      />
    );
  }

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">HorseFacts Analyzer</h1>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter prompt..."
        />
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-saddleBrown text-white rounded hover:bg-brown-700"
        >
          <Zap className="inline-block mr-2" /> Analyze
        </button>
      </div>

      {/* УДАЛЕНО: дублирующаяся кнопка Horse Lovers & Supporters */}

      <p className="mt-6 text-xs text-gray-400">
        Made by{" "}
        <a
          href="https://farcaster.xyz/u/altagers.eth"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @altagers.eth
        </a>{" "}
        with{" "}
        <a
          href="https://farcaster.xyz/u/sohey"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @sohey
        </a>{" "}
        help • Powered by MiniKit
      </p>

      <HorseLoversSection
        isOpen={showHorseLovers}
        onClose={() => setShowHorseLovers(false)}
      />
    </>
  );
}
