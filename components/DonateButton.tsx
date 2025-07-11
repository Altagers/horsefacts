'use client';

import { useState } from 'react';

export default function DonateButton({ amount = '1000000' }: { amount?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDonate = async () => {
    setLoading(true);
    setMessage(null);

    if (typeof window === 'undefined' || !window.farcasterIntegration) {
      setMessage('Donation feature unavailable.');
      setLoading(false);
      return;
    }

    try {
      const result = await window.farcasterIntegration.sendDonation(amount);
      if (result.success) {
        setMessage('Thank you for your donation!');
      } else {
        setMessage(`Donation failed: ${result.reason}`);
      }
    } catch {
      setMessage('Donation failed: unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleDonate}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Processing…' : 'Donate 1 USDC'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
