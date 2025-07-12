class FarcasterIntegration {
  constructor() {
    this.sdk = null
    this.context = null
    this.isInMiniApp = false
    this.isFarcasterApp = false
    this.init()
  }

  async init() {
    // Проверяем, работаем ли мы в Mini App
    if (!window.isMiniApp) {
      console.log('⏭️ Not in Mini App environment, skipping Farcaster initialization')
      return
    }

    try {
      console.log('🔄 Initializing Farcaster integration...')
      const sdk = await this.waitForSDK()
      this.sdk = sdk

      // Проверяем окружение Mini App
      let inEnv = true
      try {
        if (typeof sdk.isInMiniApp === 'function') {
          inEnv = await sdk.isInMiniApp()
          console.log('🔍 SDK environment check:', inEnv)
        }
      } catch (e) {
        console.warn('⚠️ Could not verify environment with SDK:', e)
      }

      if (inEnv) {
        this.isInMiniApp = true
        this.isFarcasterApp = true
        console.log('✅ Farcaster SDK initialized successfully')

        // Получаем контекст (user info и т.п.)
        try {
          this.context = await sdk.context
          console.log('📋 Farcaster context:', this.context.user)
        } catch (e) {
          console.warn('⚠️ Could not get context:', e)
        }

        await this.setupMiniAppFeatures()
      } else {
        console.warn('⚠️ SDK reports not in Mini App environment')
      }
    } catch (e) {
      console.error('❌ Error initializing Farcaster SDK:', e)
    }
  }

  async waitForSDK() {
    let attempts = 0, max = 50
    while (attempts < max) {
      if (window.sdk && typeof window.sdk.actions === 'object') {
        return window.sdk
      }
      await new Promise(r => setTimeout(r, 100))
      attempts++
    }
    throw new Error('SDK not loaded within timeout')
  }

  async setupMiniAppFeatures() {
    // Даем UI загрузиться, потом вызываем ready()
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)))
    await this.notifyAppReady()
  }

  async notifyAppReady() {
    if (this.isInMiniApp && this.sdk?.actions?.ready) {
      try {
        await this.sdk.actions.ready({ disableNativeGestures: false })
        console.log('🎉 Farcaster splash screen dismissed')
      } catch (e) {
        console.error('❌ Failed to dismiss splash screen:', e)
      }
    }
  }

  // Поделиться результатом игры/факта
  async shareScore(score, level) {
    if (!this.isFarcasterApp || !this.sdk?.actions?.composeCast) return
    try {
      await this.sdk.actions.composeCast({
        text: `🐴 I just got Fact #${level} with score ${score}! Can you discover more?`,
        embeds: [ window.location.origin ]
      })
    } catch (e) {
      console.error('Error sharing score:', e)
    }
  }

  // Получить информацию о пользователе
  getUserInfo() {
    if (this.isFarcasterApp && this.context?.user) {
      const u = this.context.user
      return { fid: u.fid, username: u.username, displayName: u.displayName, pfpUrl: u.pfpUrl }
    }
    return null
  }

  // Отправить донат через sendToken
  async sendDonation(amount = '1000000') { // 1 USDC
    if (!this.isFarcasterApp || !this.sdk?.actions?.sendToken) {
      console.warn('Farcaster SDK not available for donation')
      return { success: false, reason: 'sdk_unavailable' }
    }
    try {
      const result = await this.sdk.actions.sendToken({
        token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC
        amount,
        recipientAddress: '0x956Fa79B6855a4660FCdCe28cDf96c0042E6E2AF'
      })
      console.log(result.success ? '✅ Donation sent' : '❌ Donation failed', result)
      return result
    } catch (e) {
      console.error('❌ Error sending donation:', e)
      return { success: false, reason: 'send_failed', error: e.message }
    }
  }
}

// Инициализируем глобально
window.farcasterIntegration = new FarcasterIntegration()
console.log('FarcasterIntegration.js loaded')
