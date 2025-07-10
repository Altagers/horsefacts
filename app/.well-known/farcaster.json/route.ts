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
  return Response.json({
    frame: {
      name: "Horse Facts & Pics",
      version: "1",
      iconUrl: "https://horsefacts-pics.vercel.app/horse-logo.png",
      homeUrl: "https://horsefacts-pics.vercel.app",
      imageUrl: "https://horsefacts-pics.vercel.app/horse-banner.png",
      buttonTitle: "Check your horse fact!",
      splashImageUrl: "https://horsefacts-pics.vercel.app/horse-splash.png",
      splashBackgroundColor: "#783516",
      webhookUrl: "https://horsefacts-pics.vercel.app/api/webhook",
      subtitle: "Horse check!",
      description: "Just horse facts and pics",
      primaryCategory: "games",
      tagline: "Check your horse fact!",
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjIxNzI2MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDA3RjZkOEQzMWY0NjVGY2IyQTEyRjNEMjY3Njc3MDViRUMyMzEzOTkifQ",
      payload: "eyJkb21haW4iOiJob3JzZWZhY3RzLXBpY3MudmVyY2VsLmFwcCJ9",
      signature:
        "MHgzZGZhZjU0ZWU0MWEzNDkzNzY4ZjgxNDkzNzQzY2JhYWE5ODc4MDMzMzc0N2RhYTUwMmYzYzg2ZWZmMDg1ZTk1MGMwMzc3Y2YxNTU0NTNkMjUyMWY0NzFlOWE3MGRhNjRmY2ZlNjhjNTNlOGY5MmUzOGY1MjExZGYwMmQ2MGEwMjFj",
    },
  })
}
