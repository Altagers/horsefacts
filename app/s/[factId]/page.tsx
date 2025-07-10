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
  const appIcon = "/logo.png"
  const appIconUrl = `${appBaseUrl}${appIcon}`

  const appSplashImage = "/splash.png"
  const appSplashImageUrl = `${appBaseUrl}${appSplashImage}`

  const appSplashBackgroundColor = "#8B4513"
  const defaultFcFrameImage = `${appBaseUrl}/banner.png`

  // Define the frame structure
  let frameDefinition: any

  if (!horseFact) {
    frameDefinition = {
      version: "next",
      imageUrl: defaultFcFrameImage,
      button: {
        title: "Discover Horse Facts",
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
      title: "Horse Facts & Pics",
      description: "Discover amazing horse facts with beautiful images!",
      openGraph: {
        title: "Horse Facts & Pics",
        description: "Learn fascinating facts about horses!",
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

  frameDefinition = {
    version: "next",
    imageUrl: dynamicImageUrl.toString(),
    button: {
      title: `Horse Fact #${factId}! Discover More`,
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
    title: `Horse Fact #${factId} - Horse Facts & Pics`,
    description: `${horseFact.fact}`,
    openGraph: {
      title: `Horse Fact #${factId} 🐴`,
      description: horseFact.fact,
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
        <h1 className="text-4xl font-heading text-amber-900 mb-6 font-bold">Oops! Horse Fact Not Found</h1>
        <p className="font-body text-xl text-amber-800 mb-8">We couldn't find that horse fact.</p>
        <a href={appBaseUrl}>
          <HorseButton className="text-xl">Discover Horse Facts!</HorseButton>
        </a>
      </div>
    )
  }

  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?factId=${factId}&factImage=${encodeURIComponent(horseFact.image)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300 p-8 text-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-amber-800 max-w-lg w-full">
        <h2 className="font-heading text-amber-900 text-3xl mb-2 font-bold">This horse fact was shared:</h2>
        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`Horse Fact #${factId}`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-amber-800 mx-auto mb-6"
        />
        <p className="font-body text-xl text-amber-800 mb-8">Someone shared Horse Fact #{factId}! 🐴</p>
        <a href={appBaseUrl}>
          <HorseButton className="text-xl">Discover More Horse Facts!</HorseButton>
        </a>
      </div>
      <p className="font-body text-sm text-amber-800 mt-8">
        You were viewing a shared horse fact. Click above to discover more!
      </p>
    </div>
  )
}
