import { type NextRequest, NextResponse } from "next/server"
import { selectBestHorseFact } from "@/lib/word-matching"

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY

interface NeynarCast {
  text: string
  timestamp: string
  author: {
    username: string
    display_name: string
  }
}

interface NeynarResponse {
  casts: NeynarCast[]
}

async function fetchUserCasts(fid: number): Promise<{ casts: string[]; userName: string }> {
  if (!NEYNAR_API_KEY) {
    throw new Error("NEYNAR_API_KEY is not configured")
  }

  try {
    console.log(`API: Fetching casts for FID: ${fid}`)

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=10&include_replies=false`,
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
      throw new Error(`Failed to fetch user casts: ${response.status}`)
    }

    const data: NeynarResponse = await response.json()
    console.log(`API: Found ${data.casts?.length || 0} casts`)

    if (!data.casts || data.casts.length === 0) {
      return { casts: [], userName: "Unknown" }
    }

    const casts = data.casts.map((cast) => cast.text).filter((text) => text && text.trim().length > 0)
    const userName = data.casts[0]?.author?.username || data.casts[0]?.author?.display_name || "Unknown"

    console.log(`API: Processed ${casts.length} valid casts for user: ${userName}`)
    console.log(
      "API: Sample casts:",
      casts.slice(0, 2).map((cast) => cast.substring(0, 100)),
    )

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

    console.log(`API Route: Starting analysis for FID: ${fid}`)

    // Fetch user casts
    const { casts: userCasts, userName } = await fetchUserCasts(fid)

    // Select the best horse fact based on user's casts
    const horseFact = selectBestHorseFact(userCasts)

    const analysisMethod = userCasts.length > 0 ? "keyword-analysis" : "random"

    console.log(`API Route: Selected fact #${horseFact.id} using ${analysisMethod} method`)

    const result = {
      horseFact,
      message:
        userCasts.length > 0
          ? `Based on your recent casts, here's a horse fact that matches your interests!`
          : `Here's a random horse fact for you!`,
      analysis: {
        castsAnalyzed: userCasts.length,
        userName,
        method: analysisMethod,
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze user" },
      { status: 500 },
    )
  }
}
