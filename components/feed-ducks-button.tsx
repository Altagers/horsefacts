"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { parseEther } from "viem"
import { Heart } from "lucide-react"

const DONATION_ADDRESS = "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF"
const DEFAULT_AMOUNT = "0.001" // ETH

export function FeedDucksButton() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDonate = async () => {
    if (!context?.user?.fid) {
      setError("Please connect your Farcaster wallet first! 🦆")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Check if MiniKit wallet is available
      if (!window.ethereum) {
        throw new Error("Wallet not available. Please use Farcaster mobile app!")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No wallet accounts found")
      }

      // Get current network
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      // Check if on Ethereum mainnet (0x1) or Base (0x2105)
      if (chainId !== "0x1" && chainId !== "0x2105") {
        throw new Error("Please switch to Ethereum Mainnet or Base network")
      }

      // Prepare transaction
      const transactionParameters = {
        to: DONATION_ADDRESS,
        from: accounts[0],
        value: parseEther(DEFAULT_AMOUNT).toString(16), // Convert to hex
        gas: "0x5208", // 21000 gas limit for simple transfer
      }

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      console.log("Transaction sent:", txHash)
      setSuccess(true)

      // Reset success state after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error("Donation error:", err)
      setError(err.message || "Failed to send donation. Please try again!")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <button
        disabled
        className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white western-button-text text-sm rounded-xl border-3 border-green-700 shadow-[3px_3px_0px_0px_rgba(21,128,61,1)] animate-pulse"
      >
        <span className="flex items-center justify-center gap-2 light-text">
          <span className="text-lg">✅</span>
          Thank you for feeding the ducks!
          <span className="text-lg">🦆</span>
        </span>
      </button>
    )
  }

  return (
    <div className="w-full">
      <button
        onClick={handleDonate}
        disabled={loading || !context?.user?.fid}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white western-button-text text-sm rounded-xl border-3 border-blue-700 shadow-[3px_3px_0px_0px_rgba(29,78,216,1)] hover:shadow-[5px_5px_0px_0px_rgba(29,78,216,1)] transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2 light-text">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending donation...
            </>
          ) : !context?.user?.fid ? (
            <>
              <span className="text-lg">🔗</span>
              Connect Wallet to Donate
            </>
          ) : (
            <>
              <span className="text-lg">🦆</span>
              Feed the Ducks ({DEFAULT_AMOUNT} ETH)
              <Heart className="w-4 h-4 fill-current animate-pulse" />
            </>
          )}
        </span>
      </button>

      {/* Donation Info */}
      <div className="mt-2 text-xs font-body bg-blue-50 p-2 rounded-lg border border-blue-200">
        <div className="text-blue-800 font-semibold mb-1">💡 Donation Info:</div>
        <div className="text-blue-700 space-y-1">
          <div>• Amount: {DEFAULT_AMOUNT} ETH</div>
          <div>• Network: Ethereum/Base</div>
          <div className="break-all">• To: {DONATION_ADDRESS}</div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-800 text-xs font-semibold flex items-center gap-1">
            <span>⚠️</span>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
