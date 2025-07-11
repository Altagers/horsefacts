"use client";

import React, { useState } from "react";
import { DonateButton } from "./DonateButton";
import { HorseFactAnalyzerProps } from "@/types";

export function HorseFactAnalyzer({
  horseFact,
  imageUrl,
}: HorseFactAnalyzerProps) {
  const [showHorseLovers, setShowHorseLovers] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-4">
      <img
        src={imageUrl}
        alt="Horse"
        className="rounded-lg shadow-lg mb-4 w-full"
      />
      <p className="text-lg text-gray-800 mb-4">{horseFact}</p>

      <button
        onClick={() => setShowHorseLovers(true)}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
      >
        🐴 Horse Lovers Hub
      </button>

      {/* Кнопка доната */}
      <DonateButton />

      {showHorseLovers && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          {/* Ваш контент Horse Lovers */}
          <h2 className="text-xl font-bold mb-2">Horse Lovers Community</h2>
          <p className="text-gray-700">
            Присоединяйтесь к Horse Lovers Hub и делитесь фактами о лошадях!
          </p>
        </div>
      )}
    </div>
);
}
