"use client";
import React, { useState, useEffect } from "react";
import { Heart, DollarSign } from "lucide-react";

class FarcasterIntegration {
  sdk: any = null;
  isFarcasterApp = false;

  async init() {
    if (!window.isMiniApp) return;
    const sdk = await this.waitForSDK();
    if (sdk?.actions?.sendToken) {
      this.sdk = sdk;
      this.isFarcasterApp = true;
    }
  }

  async waitForSDK() {
    let tries = 0;
    const max = 50;
    while (tries < max) {
      // @ts-ignore
      if (window.sdk && window.sdk.actions) return window.sdk;
      await new Promise((r) => setTimeout(r, 100));
      tries++;
    }
    throw new Error("Farcaster SDK timeout");
  }

  async sendDonation(amount: string) {
    if (!this.isFarcasterApp) {
      console.log("SDK not available, fallback");
      return { success: false, reason: "sdk_unavailable" };
    }
    return this.sdk.actions.sendToken({
      token: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      amount,
      recipientAddress: "0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF",
    });
  }
}

export function DonateButton() {
  const [amount, setAmount] = useState("1.00");
  const [loading, setLoading] = useState(false);
  const [integration, setIntegration] = useState<FarcasterIntegration>();

  useEffect(() => {
    const setup = async () => {
      const fi = new FarcasterIntegration();
      await fi.init();
      setIntegration(fi);
    };
    setTimeout(setup, 500);
  }, []);

  const handleDonate = async () => {
    if (!integration) return;
    setLoading(true);
    const amt = Math.floor(parseFloat(amount) * 1e6).toString();
    try {
      const res = await integration.sendDonation(amt);
      if (res.success) {
        alert(`Спасибо за донат $${amount}! Tx: ${res.send.transaction}`);
      } else if (res.reason === "sdk_unavailable") {
        alert(
          `Пожертвование недоступно. Пожалуйста, отправьте USDC на адрес:\n0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF`
        );
      } else {
        alert("Ошибка: " + res.reason);
      }
    } catch {
      alert(
        `Ошибка отправки. Пожалуйста, вручную отправьте USDC на адрес:\n0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-5 h-5 text-red-500" />
        <span className="text-lg font-semibold text-amber-800">
          Support Horse Facts
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white rounded-lg border border-amber-300 px-3 py-2">
          <DollarSign className="w-4 h-4 text-amber-600 mr-1" />
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-20 text-center border-none outline-none text-amber-800 font-semibold"
          />
          <span className="text-xs text-amber-600 ml-1">USDC</span>
        </div>

        <button
          onClick={handleDonate}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-yellow-700 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Heart className="w-4 h-4" />
              Donate
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-amber-700 mt-2">
        💫 Support the creator with USDC on Base network
      </p>
    </div>
  );
}
