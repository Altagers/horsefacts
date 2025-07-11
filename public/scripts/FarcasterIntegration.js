// public/scripts/FarcasterIntegration.js
// Используем ESM через CDN, чтобы не ждать window.sdk
import { initMiniApp, sdk } from 'https://esm.sh/@farcaster/miniapp-sdk';

class FarcasterIntegration {
  constructor() {
    this.sdk = null;
  }

  async init() {
    try {
      console.log('🔄 Initializing Farcaster MiniApp SDK...');
      await initMiniApp(); // инициализация
      this.sdk = sdk;
      const inMini = await this.sdk.isInMiniApp();
      if (!inMini) {
        console.warn('⚠️ Not running in a Farcaster Mini App');
        return;
      }
      console.log('✅ MiniApp environment confirmed');
      await this.sdk.actions.ready({ disableNativeGestures: false });
      console.log('🎉 Splash screen dismissed');
    } catch (err) {
      console.error('❌ Error initializing MiniApp SDK:', err);
    }
  }

  async sendDonation(amount = '1000000') {
    if (!this.sdk?.actions?.sendToken) {
      console.warn('🚫 sendToken unavailable');
      return { success: false, reason: 'sdk_unavailable' };
    }
    try {
      const result = await this.sdk.actions.sendToken({
        token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        amount,
        recipientAddress: '0x7Ea45b01EECaE066f37500c92B10421937571f75'
      });
      console.log(result.success ? '✅ Donation sent' : '⚠️ Donation failed', result);
      return result;
    } catch (err) {
      console.error('❌ sendDonation error:', err);
      return { success: false, reason: 'send_failed', error: err.message };
    }
  }
}

// Экспорт в глобальный scope
window.farcasterIntegration = new FarcasterIntegration();
console.log('FarcasterIntegration.js loaded');
