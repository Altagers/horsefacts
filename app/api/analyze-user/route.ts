import { type NextRequest, NextResponse } from "next/server"
import { selectBestHorseFact } from "@/lib/word-matching"

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY

if (!NEYNAR_API_KEY) {
  console.error("NEYNAR_API_KEY is not set")
}

async function fetchUserCasts(fid: number): Promise<{ casts: string[]; userName: string }> {
  if (!NEYNAR_API_KEY) {
    throw new Error("Neynar API key not configured")
  }

  try {
    console.log(`Fetching casts for FID: ${fid}`)

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/casts?fid=${fid}&limit=10&include_replies=false`,
      {
        headers: {
          Accept: "application/json",
          api_key: NEYNAR_API_KEY,
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Neynar API error: ${response.status} - ${errorText}`)
      throw new Error(`Failed to fetch casts: ${response.status}`)
    }

    const data = await response.json()
    console.log(`Neynar API response:`, JSON.stringify(data, null, 2))

    if (!data.casts || !Array.isArray(data.casts)) {
      console.log("No casts found in response")
      return { casts: [], userName: "unknown" }
    }

    const casts = data.casts.map((cast: any) => cast.text).filter((text: string) => text && text.trim().length > 0)

    const userName = data.casts[0]?.author?.username || "unknown"

    console.log(`Found ${casts.length} casts for user ${userName}`)
    console.log("Cast texts:", casts)

    return { casts, userName }
  } catch (error) {
    console.error("Error fetching user casts:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fid } = await request.json()

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    console.log(`API: Analyzing casts for FID: ${fid}`)

    // Fetch user's recent casts
    const { casts: userCasts, userName } = await fetchUserCasts(fid)

    // Select the best matching horse fact
    const { fact: horseFact, method } = selectBestHorseFact(userCasts)

    const result = {
      horseFact,
      message:
        method === "keyword-analysis"
          ? `Based on your recent casts, here's a horse fact that matches your interests!`
          : `Here's a random horse fact for you!`,
      analysis: {
        castsAnalyzed: userCasts.length,
        userName,
        method,
      },
    }

    console.log(`API: Returning result:`, result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze casts" },
      { status: 500 },
    )
  }
}
