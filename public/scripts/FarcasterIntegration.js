class FarcasterIntegration {
  constructor() {
    this.sdk = null;
    this.context = null;
    this.isInMiniApp = false;
    this.isFarcasterApp = false;
  }

  async init() {
    try {
      console.log('🔄 Initializing Farcaster integration...');
      const sdk = await this.waitForSDK();
      this.sdk = sdk;

      let inMini = true;
      try {
        if (typeof sdk.isInMiniApp === 'function') {
          inMini = await sdk.isInMiniApp();
          console.log('🔍 SDK environment check:', inMini);
        }
      } catch (error) {
        console.log('⚠️ Could not verify environment with SDK:', error);
      }

      if (inMini) {
        this.isInMiniApp = true;
        this.isFarcasterApp = true;
        console.log('✅ Farcaster SDK initialized successfully');

        try {
          this.context = await sdk.context;
          console.log('📋 Farcaster context received');
        } catch (error) {
          console.log('⚠️ Could not get context:', error.message);
        }

        await this.setupMiniAppFeatures();
      } else {
        console.log('⚠️ SDK reports not in Mini App environment');
      }
    } catch (error) {
      console.error('❌ Error initializing Farcaster SDK:', error);
      this.isInMiniApp = false;
    }
  }

  async waitForSDK() {
    let attempts = 0;
    const maxAttempts = 50;
    while (attempts < maxAttempts) {
      if (window.sdk && typeof window.sdk.actions === 'object') {
        return window.sdk;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    throw new Error('SDK not loaded within timeout');
  }

  async setupMiniAppFeatures() {
    await new Promise(resolve => {
      requestAnimationFrame(() => setTimeout(resolve, 500));
    });
    console.log('🎉 Mini App features setup complete');
  }

  async notifyAppReady() {
    if (this.sdk?.actions?.ready) {
      try {
        await this.sdk.actions.ready({ disableNativeGestures: false });
        console.log('🎉 Farcaster splash screen dismissed');
      } catch (error) {
        console.error('❌ Failed to dismiss splash screen:', error);
      }
    }
  }

  async sendDonation(amount = '1000000') {
    if (!this.sdk?.actions?.sendToken) {
      console.log('Farcaster SDK not available for donation');
      return { success: false, reason: 'sdk_unavailable' };
    }

    try {
      const result = await this.sdk.actions.sendToken({
        token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        amount: amount,
        recipientAddress: '0x7Ea45b01EECaE066f37500c92B10421937571f75'
      });

      if (result.success) {
        console.log('Donation sent successfully:', result.send.transaction);
      } else {
        console.log('Error during donation:', result.error);
      }
      return result;
    } catch (error) {
      console.error('Error sending donation:', error);
      return { success: false, reason: 'send_failed', error: error.message };
    }
  }
}

// Expose globally
window.farcasterIntegration = new FarcasterIntegration();
console.log('FarcasterIntegration.js loaded');
