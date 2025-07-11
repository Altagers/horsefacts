class FarcasterIntegration {
  constructor() {
    this.sdk = null;
    this.context = null;
    this.isInMiniApp = false;
    this.isFarcasterApp = false;
  }

  async init() {
    if (!window.isMiniApp) {
      console.log('⏭️ Not in Mini App environment, skipping Farcaster initialization');
      return;
    }

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
      } catch {}

      if (inMini) {
        this.isInMiniApp = true;
        this.isFarcasterApp = true;
        console.log('✅ Farcaster SDK initialized');

        try {
          this.context = await sdk.context;
          console.log('📋 Context received');
        } catch {}

        await this.setupMiniAppFeatures();
      } else {
        console.log('⚠️ Not in Mini App according to SDK');
      }
    } catch (e) {
      console.error('❌ Initialization error:', e);
      this.isInMiniApp = false;
    }
  }

  async waitForSDK() {
    let attempts = 0;
    while (attempts < 50) {
      if (window.sdk && typeof window.sdk.actions === 'object') {
        return window.sdk;
      }
      await new Promise(res => setTimeout(res, 100));
      attempts++;
    }
    throw new Error('SDK load timeout');
  }

  async setupMiniAppFeatures() {
    await new Promise(res => {
      requestAnimationFrame(() => setTimeout(res, 500));
    });
    console.log('🎉 Mini App features ready');
  }

  async notifyAppReady() {
    if (this.isInMiniApp && this.sdk?.actions?.ready) {
      try {
        await this.sdk.actions.ready({ disableNativeGestures: false });
        console.log('🎉 Splash screen dismissed');
      } catch (e) {
        console.error('❌ Ready error:', e);
      }
    }
  }

  async sendDonation(amount = '1000000') {
    if (!this.isFarcasterApp || !this.sdk?.actions?.sendToken) {
      console.log('❌ SDK not available for donation');
      return { success: false, reason: 'sdk_unavailable' };
    }
    try {
      const result = await this.sdk.actions.sendToken({
        token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        amount,
        recipientAddress: '0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF',
      });
      console.log(result.success ? '✅ Donation sent' : '❌ Donation failed', result);
      return result;
    } catch (e) {
      console.error('❌ sendDonation error:', e);
      return { success: false, reason: 'send_failed', error: e.message };
    }
  }
}

window.farcasterIntegration = new FarcasterIntegration();
console.log('FarcasterIntegration.js loaded');
