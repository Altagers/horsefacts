declare global {
  interface Window {
    farcasterIntegration: {
      sendDonation: (amount?: string) => Promise<{ success: boolean; reason?: string; error?: string }>;
      isFarcasterApp: boolean;
      sdk: any;
    };
  }
}

export {}
