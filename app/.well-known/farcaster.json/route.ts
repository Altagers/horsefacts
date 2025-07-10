function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return !!value
    }),
  )
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL

  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: "1",
      name: "Horse Facts & Pics",
      subtitle: "Discover Amazing Horse Facts",
      description: "Learn fascinating facts about horses with beautiful images",
      screenshotUrls: [],
      iconUrl: `${URL}/logo.png`,
      splashImageUrl: `${URL}/splash.png`,
      splashBackgroundColor: "#8B4513",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "education",
      tags: ["horses", "facts", "education", "animals"],
      heroImageUrl: `${URL}/banner.png`,
      tagline: "Amazing Horse Facts & Beautiful Pictures",
      ogTitle: "Horse Facts & Pics - Learn About Horses",
      ogDescription: "Discover fascinating facts about horses with stunning imagery",
      ogImageUrl: `${URL}/banner.png`,
    }),
  })
}
