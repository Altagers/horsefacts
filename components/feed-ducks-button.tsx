"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { parseEther, formatEther } from "viem"
import { useAccount, useSendTransaction, useBalance } from "wagmi"
import { Heart, Wallet, AlertCircle, CheckCircle } from "lucide-react"

const DONATION_ADDRESS = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF"
const DEFAULT_AMOUNT = "0.001" // ETH

export function FeedDucksButton() {
  const { context } = useMiniKit()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction, isPending, isSuccess, error } = useSendTransaction()

  const [showDetails, setShowDetails] = useState(false)
  const [customAmount, setCustomAmount] = useState(DEFAULT_AMOUNT)
  const [txHash, setTxHash] = useState<string>("")

  const handleDonate = async () => {
    if (!isConnected || !address) {
      console.error("Wallet not connected")
      return
    }

    try {
      const result = await sendTransaction({
        to: DONATION_ADDRESS as `0x${string}`,
        value: parseEther(customAmount),
      })

      if (result) {
        setTxHash(result)
        console.log("Transaction sent:", result)
      }
    } catch (err) {
      console.error("Transaction failed:", err)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const hasEnoughBalance = balance && Number.parseFloat(formatEther(balance.value)) >= Number.parseFloat(customAmount)

  if (isSuccess && txHash) {
    return (
      <div className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 border-4 border-green-700 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(21,128,61,1)] mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-white font-bold">Thank you! 🦆💚</span>
        </div>
        <p className="text-white text-sm">Ducks are well fed! Transaction: {formatAddress(txHash)}</p>
        <button
          onClick={() => {
            setTxHash("")
            setShowDetails(false)
          }}
          className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
        >
          Donate Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white western-button-text text-sm rounded-xl border-3 border-blue-700 shadow-[3px_3px_0px_0px_rgba(29,78,216,1)] hover:shadow-[5px_5px_0px_0px_rgba(29,78,216,1)] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isConnected}
      >
        <span className="flex items-center justify-center gap-2 light-text">
          <span className="text-xl">🦆</span>
          Feed the Ducks (Donate)
          <Heart className="w-4 h-4 fill-current animate-pulse" />
        </span>
      </button>

      {showDetails && (
        <div className="mt-4 p-4 bg-white border-3 border-blue-600 rounded-2xl shadow-lg">
          <div className="space-y-4">
            {/* Network & Address Info */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 font-semibold text-sm">Donation Details</span>
              </div>
              <div className="text-xs space-y-1">
                <p className="text-blue-800">
                  <strong>To:</strong> {formatAddress(DONATION_ADDRESS)}
                </p>
                <p className="text-blue-800">
                  <strong>Network:</strong> Ethereum Mainnet
                </p>
                {balance && (
                  <p className="text-blue-800">
                    <strong>Your Balance:</strong> {Number.parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                  </p>
                )}
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Amount (ETH)</label>
              <div className="flex gap-2 mb-3">
                {["0.001", "0.005", "0.01"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCustomAmount(amount)}
                    className={`px-3 py-1 text-xs rounded-lg border-2 transition-colors ${
                      customAmount === amount
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-blue-600 border-blue-300 hover:border-blue-500"
                    }`}
                  >
                    {amount} ETH
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                placeholder="Custom amount"
              />
            </div>

            {/* Balance Warning */}
            {!hasEnoughBalance && balance && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 text-xs">
                  Insufficient balance. You need at least {customAmount} ETH.
                </span>
              </div>
            )}

            {/* Connection Status */}
            {!isConnected && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-700 text-xs">Please connect your Farcaster wallet to donate.</span>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 text-xs">Transaction failed: {error.message}</span>
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={handleDonate}
              disabled={!isConnected || !hasEnoughBalance || isPending}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-sm rounded-xl border-3 border-green-700 shadow-[3px_3px_0px_0px_rgba(21,128,61,1)] hover:shadow-[5px_5px_0px_0px_rgba(21,128,61,1)] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg">🦆</span>
                  Send {customAmount} ETH
                  <span className="text-lg">💚</span>
                </span>
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowDetails(false)}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
