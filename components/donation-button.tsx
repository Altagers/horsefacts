"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink } from "lucide-react"

interface DonationButtonProps {
  className?: string
  amount?: string
  variant?: "default" | "outline" | "ghost"
}

export function DonationButton({ 
  className, 
  amount = "1000000", 
  variant = "default" 
}: DonationButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDonate = async () => {
    setIsProcessing(true)
    
    try {
      // Check if we're in Farcaster Mini App
      const isFarcasterApp = !!(window.parent && window.parent !== window && 
                               (window.location.search.includes('miniApp=true') || 
                                window.location.href.includes('farcaster')))
      
      if (isFarcasterApp && window.farcasterIntegration) {
        const result = await window.farcasterIntegration.sendDonation(amount)
        
        if (result.success) {
          console.log('Donation successful!')
          // Optional: Show success message
        } else {
          console.log('Donation failed:', result.reason)
          // Fallback to manual donation
          showManualDonation()
        }
      } else {
        // Not in Farcaster app, show manual donation
        showManualDonation()
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      showManualDonation()
    } finally {
      setIsProcessing(false)
    }
  }

  const showManualDonation = async () => {
    const address = '0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF'
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(address)
        alert(`Wallet address copied to clipboard:\n${address}\n\nPlease send USDC (Base network)`)
      } else {
        alert(`Please send USDC to this address (Base network):\n${address}`)
      }
    } catch (error) {
      alert(`Please send USDC to this address (Base network):\n${address}`)
    }
  }

  return (
    <Button
      onClick={handleDonate}
      disabled={isProcessing}
      variant={variant}
      className={`${className} relative overflow-hidden`}
    >
      <Heart className="w-4 h-4 mr-2" />
      {isProcessing ? 'Processing...' : 'Donate USDC'}
      <ExternalLink className="w-4 h-4 ml-2" />
    </Button>
  )
}
