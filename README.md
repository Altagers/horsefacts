# Horse Facts & Pics - Farcaster Mini App

A beautiful, minimalist Farcaster Mini App that shares fascinating horse facts with stunning imagery. Built with Next.js, featuring elegant design and seamless social sharing.

## 🐴 Features

- **10 Amazing Horse Facts**: Each fact paired with a beautiful corresponding image
- **Minimalist Design**: Clean, modern UI with horse-themed color palette
- **Social Sharing**: Share horse facts directly to Farcaster with rich embeds
- **Responsive**: Works perfectly on desktop and mobile
- **Fast & Lightweight**: Optimized for performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom horse theme
- **APIs**: Neynar (Farcaster data), OpenAI (content analysis)
- **Deployment**: Vercel
- **Framework**: Coinbase OnchainKit (MiniKit)

## 🚀 Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd horse-facts-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your API keys:
   - `NEYNAR_API_KEY`: Get from [Neynar](https://neynar.com) (free tier available)
   - `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com)
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [OnchainKit](https://onchainkit.xyz)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🖼️ Image Assets

All images are stored in the `/public` directory:

- **Horse Facts**: `1.png` through `10.png` (each corresponds to a specific fact)
- **App Assets**: 
  - `logo.png` - App logo
  - `splash.png` - Splash screen image  
  - `banner.png` - Header banner image

## 📱 Horse Facts Included

1. **Breathing**: Horses can only breathe through their nostrils, not their mouth
2. **Vision**: 360-degree vision with blind spots in front and behind
3. **Eyes**: Largest eyes among all terrestrial mammals
4. **Sleep**: Can sleep standing up but need to lie down for deep sleep
5. **Heart**: Weighs 4-5 kg and pumps 250L of blood per minute when running
6. **Teeth**: Grow throughout their lifetime, age determined by wear
7. **Digestion**: No gallbladder but can still digest plant food perfectly
8. **Memory**: Excellent memory, can recognize people after years
9. **Communication**: Use 17+ facial expressions to communicate
10. **Intelligence**: Can learn to open doors and use simple mechanisms

## 🎨 Design Theme

- **Colors**: Warm earth tones (tans, ambers, browns)
- **Typography**: Custom fonts for elegance and readability
- **Layout**: Minimalist with focus on content and imagery
- **Interactions**: Smooth animations and hover effects

## 🔧 Configuration

The app is configured through environment variables. Key settings:

- **App Name**: "Horse Facts & Pics"
- **Theme Color**: Saddle Brown (#8B4513)
- **Category**: Education
- **Target Audience**: Horse enthusiasts, educators, animal lovers

## 📦 Deployment

The app is configured for easy deployment on Vercel:

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

Current deployment: `https://v0-powerpuff-girls-ow.vercel.app`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Horse facts sourced from equine research and veterinary sources
- Images optimized for web performance and accessibility
- Built with love for horse enthusiasts everywhere

---

**Made with 🐴 and ❤️ for the Farcaster community**
