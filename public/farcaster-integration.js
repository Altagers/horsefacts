class FarcasterIntegration {
  constructor() {
    this.isFarcasterApp = this.detectFarcasterApp();
    this.sdk = null;
    this.initializeFarcasterSDK();
  }

  detectFarcasterApp() {
    // Check for Farcaster Mini App environment
    return !!(window.parent && window.parent !== window && 
             (window.location.search.includes('miniApp=true') || 
              window.location.href.includes('farcaster')));
  }

  async initializeFarcasterSDK() {
    if (!this.isFarcasterApp) {
      console.log('Not in Farcaster Mini App environment');
      return;
    }

    try {
      // Initialize Farcaster SDK
      if (window.parent && window.parent.postMessage) {
        this.sdk = {
          actions: {
            sendToken: this.sendTokenViaFarcaster.bind(this)
          }
        };
        console.log('Farcaster SDK initialized');
      }
    } catch (error) {
      console.error('Failed to initialize Farcaster SDK:', error);
    }
  }

  async sendTokenViaFarcaster(params) {
    return new Promise((resolve, reject) => {
      const message = {
        type: 'SEND_TOKEN',
        data: params
      };
      
      window.parent.postMessage(message, '*');
      
      // Listen for response
      const handleMessage = (event) => {
        if (event.data.type === 'SEND_TOKEN_RESPONSE') {
          window.removeEventListener('message', handleMessage);
          if (event.data.success) {
            resolve(event.data);
          } else {
            reject(new Error(event.data.error || 'Transaction failed'));
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Timeout after 30 seconds
      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        reject(new Error('Transaction timeout'));
      }, 30000);
    });
  }

  async sendDonation(amount = '1000000') { // Default 1 USDC
    if (!this.isFarcasterApp || !this.sdk || !this.sdk.actions || !this.sdk.actions.sendToken) {
      console.log('Farcaster SDK not available for donation');
      return { success: false, reason: 'sdk_unavailable' };
    }

    try {
      const result = await this.sdk.actions.sendToken({
        token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC
        amount: amount, // 1 USDC = 1000000 (6 decimals)
        recipientAddress: '0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF'
      });
      
      return result;
    } catch (error) {
      console.error('Error sending donation:', error);
      return { success: false, reason: 'send_failed', error: error.message };
    }
  }
}

// Initialize and expose globally
window.farcasterIntegration = new FarcasterIntegration();
