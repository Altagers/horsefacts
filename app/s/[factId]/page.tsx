import type { Metadata, ResolvingMetadata } from "next"
import { getHorseFactById } from "@/lib/horse-facts"
import { HorseButton } from "@/components/horse-button"

type Props = {
  params: { factId: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const factIdParam = decodeURIComponent(params.factId)
  const factId = Number.parseInt(factIdParam)
  const horseFact = getHorseFactById(factId)

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-ow.vercel.app"
  const appName = "Horse Facts & Pics"

  // Ensure icon and splash URLs are absolute and have defaults
  const appIcon = "/horse-logo.png"
  const appIconUrl = `${appBaseUrl}${appIcon}`

  const appSplashImage = "/horse-splash.png"
  const appSplashImageUrl = `${appBaseUrl}${appSplashImage}`

  const appSplashBackgroundColor = "#8B4513"
  const defaultFcFrameImage = `${appBaseUrl}/horse-banner.png`

  // Define the frame structure
  let frameDefinition: any

  if (!horseFact) {
    frameDefinition = {
      version: "next",
      imageUrl: defaultFcFrameImage,
      button: {
        title: "🐴 Discover Horse Facts",
        action: {
          type: "launch_frame",
          name: appName,
          url: appBaseUrl,
          splashImageUrl: appSplashImageUrl,
          splashBackgroundColor: appSplashBackgroundColor,
        },
      },
    }
    return {
      title: "Horse Facts & Pics - Made by @altagers.eth",
      description: "Discover amazing horse facts! Made by @altagers.eth with @sohey help, powered by MiniKit 🚀",
      openGraph: {
        title: "Horse Facts & Pics",
        description: "Learn fascinating facts about horses! Made by @altagers.eth with @sohey help 🐴",
        images: [{ url: defaultFcFrameImage }],
      },
      other: {
        "fc:frame": JSON.stringify(frameDefinition),
      },
    }
  }

  const dynamicImageUrl = new URL("/api/generate-og-image", appBaseUrl)
  dynamicImageUrl.searchParams.set("factId", factId.toString())
  dynamicImageUrl.searchParams.set("factImage", horseFact.image)

  const funnyPhrases = [
    "Holy horseshoes!",
    "Giddy up for knowledge!",
    "Straight from the horse's mouth:",
    "Neigh-ver knew this!",
    "Stable genius fact:",
  ]

  const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)]

  frameDefinition = {
    version: "next",
    imageUrl: dynamicImageUrl.toString(),
    button: {
      title: `🤯 ${randomPhrase} Discover More!`,
      action: {
        type: "launch_frame",
        name: appName,
        url: appBaseUrl,
        splashImageUrl: appSplashImageUrl,
        splashBackgroundColor: appSplashBackgroundColor,
      },
    },
  }

  return {
    title: `🐴 Horse Fact #${factId} - Made by @altagers.eth`,
    description: `${horseFact.fact} Made by @altagers.eth with @sohey help, powered by MiniKit! 🚀`,
    openGraph: {
      title: `🐴 Horse Fact #${factId} - Mind = Blown! 🤯`,
      description: `${horseFact.fact} Made by @altagers.eth with @sohey help, powered by MiniKit!`,
      images: [{ url: dynamicImageUrl.toString(), width: 1200, height: 630, alt: `Horse Fact #${factId}` }],
    },
    other: {
      "fc:frame": JSON.stringify(frameDefinition),
    },
  }
}

// Fallback page content
export default function SharePage({ params }: Props) {
  const factIdParam = decodeURIComponent(params.factId)
  const factId = Number.parseInt(factIdParam)
  const horseFact = getHorseFactById(factId)
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-ow.vercel.app"

  if (!horseFact) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300 p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">🤠</div>
        <h1 className="text-4xl font-heading text-amber-900 mb-6 font-bold">Whoa there, partner!</h1>
        <p className="font-body text-xl text-amber-800 mb-8">This horse fact galloped away! 🐎💨</p>
        <a href={appBaseUrl}>
          <HorseButton className="text-xl">🎯 Discover Horse Facts!</HorseButton>
        </a>
        <div className="mt-6 text-sm text-amber-700">
          Made by @altagers.eth with @sohey help • Powered by MiniKit 🚀
        </div>
      </div>
    )
  }

  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?factId=${factId}&factImage=${encodeURIComponent(horseFact.image)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300 p-8 text-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-amber-800 max-w-lg w-full relative">
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🤯</div>
        <div className="absolute -top-4 -left-4 text-4xl animate-pulse">🐴</div>

        <h2 className="font-heading text-amber-900 text-3xl mb-4 font-bold">
          Holy horseshoes! Someone shared this epic fact:
        </h2>

        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`Horse Fact #${factId}`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-amber-800 mx-auto mb-6 hover:scale-105 transition-transform duration-300"
        />

        <p className="font-body text-xl text-amber-800 mb-8">🎯 Horse Fact #{factId} is ready to blow your mind! 🤯</p>

        <a href={appBaseUrl}>
          <HorseButton className="text-xl transform hover:scale-105 transition-all duration-200">
            🚀 Discover More Epic Facts!
          </HorseButton>
        </a>

        <div className="mt-6 text-xs text-amber-700 italic">
          Made by @altagers.eth with @sohey help • Powered by MiniKit 🚀
        </div>
      </div>

      <p className="font-body text-sm text-amber-800 mt-8 italic">"Neigh-ver a dull moment with horse facts!" 🐎✨</p>
    </div>
  )
}
