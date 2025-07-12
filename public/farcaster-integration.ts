/*
 * Minimal Farcaster Mini App SDK integration singleton.
 * Handles SDK loading, environment detection and exposes helper methods
 * such as `sendDonation` that uses `sdk.actions.sendToken` under the hood.
 *
 * Usage (client side only):
 *     import farcasterIntegration from "@/lib/farcaster-integration";
 *     await farcasterIntegration.sendDonation("1000000"); // 1 USDC (6 decimals)
 */

// We are in a Next.js / TypeScript project – declare global Window shape
declare global {
  interface Window {
    isMiniApp?: boolean
    sdk?: any
    farcasterIntegration?: FarcasterIntegration
  }
}

export interface DonationResult {
  success: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

class FarcasterIntegration {
  private sdk: any | null = null
  private context: any | null = null
  private isInMiniApp = false
  private isFarcasterApp = false
  private _initialised = false

  /**
   * Call this once on the client. Re-calling is a no-op.
   */
  public async init(): Promise<void> {
    if (this._initialised) return
    this._initialised = true

    // Only run in browser
    if (typeof window === "undefined") return

    // Check Mini App flag – on web this is undefined/false
    if (!window.isMiniApp) {
      // Silently ignore when not running inside Farcaster Mini-App
      return
    }

    try {
      this.sdk = await this.waitForSDK()

      // Optional environment check
      let isInMiniAppEnv = true
      try {
        if (typeof this.sdk.isInMiniApp === "function") {
          isInMiniAppEnv = await this.sdk.isInMiniApp()
        }
      } catch (_) {
        /* ignore */
      }

      if (!isInMiniAppEnv) return

      this.isInMiniApp = true
      this.isFarcasterApp = true

      try {
        this.context = await this.sdk.context
      } catch (_) {
        /* ignore */
      }

      // Notify Farcaster that UI is ready after next frame
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.sdk?.actions?.ready?.({ disableNativeGestures: false }).catch(() => null)
        }, 500)
      })
    } catch (err) {
      console.error("Farcaster integration failed", err)
    }
  }

  /** Waits up to ~5s for global `window.sdk` provided by Farcaster */
  private async waitForSDK(): Promise<any> {
    let attempts = 0
    const MAX = 50 // every 100ms
    while (attempts < MAX) {
      if (window.sdk && typeof window.sdk.actions === "object") return window.sdk
      await new Promise((res) => setTimeout(res, 100))
      attempts++
    }
    throw new Error("Farcaster SDK not loaded within timeout")
  }

  /** Expose basic user info if available */
  public get user() {
    return this.context?.user ?? null
  }

  /** Quick helper to check if running inside Farcaster */
  public get available() {
    return this.isFarcasterApp && !!this.sdk
  }

  /**
   * Send a USDC donation via `sdk.actions.sendToken`.
   * token: Base USDC (6 decimals) by default.
   * @param amount string – amount in smallest unit (defaults to 1 USDC -> "1000000")
   */
  public async sendDonation(amount = "1000000"): Promise<DonationResult> {
    if (!this.available || !this.sdk?.actions?.sendToken) {
      return { success: false, reason: "sdk_unavailable" }
    }

    try {
      const result = await this.sdk.actions.sendToken({
        token: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
        amount,
        recipientAddress: "0x7Ea45b01EECaE066f37500c92B10421937571f75",
      })
      return result
    } catch (err: any) {
      console.error("Donation error", err)
      return { success: false, reason: "send_failed", error: err?.message }
    }
  }
}

// Create singleton for easy import
const farcasterIntegration = new FarcasterIntegration()
if (typeof window !== "undefined") {
  window.farcasterIntegration = farcasterIntegration
  // Lazy initialise (not awaited)
  farcasterIntegration.init()
}

export default farcasterIntegration
