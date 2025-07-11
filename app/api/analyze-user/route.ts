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

export async function POST(request: NextRequest) {
  try {
    const { fid } = await request.json()

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    if (!NEYNAR_API_KEY) {
      console.error("❌ NEYNAR_API_KEY is not configured")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    console.log(`🔍 Backend: Fetching casts for FID: ${fid}`)

    // Fetch user's recent casts from Neynar API
    const neynarUrl = `https://api.neynar.com/v2/farcaster/casts?fid=${fid}&limit=10`

    const response = await fetch(neynarUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: NEYNAR_API_KEY,
      },
    })

    if (!response.ok) {
      console.error(`❌ Neynar API error: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error("Error details:", errorText)
      return NextResponse.json({ error: "Failed to fetch user casts" }, { status: 500 })
    }

    const data: NeynarResponse = await response.json()
    console.log(`📊 Backend: Retrieved ${data.casts?.length || 0} casts`)

    // Extract cast text for analysis
    const userCasts: string[] = data.casts?.map((cast) => cast.text) || []
    const userName = data.casts?.[0]?.author?.username || data.casts?.[0]?.author?.display_name || "Unknown"

    console.log(`📝 Backend: Analyzing ${userCasts.length} casts for user: ${userName}`)
    console.log("Cast texts:", userCasts.slice(0, 3)) // Log first 3 for debugging

    // Use word matching to select the best horse fact
    const horseFact = selectBestHorseFact(userCasts)

    // Determine analysis method
    const method = userCasts.length > 0 ? "keyword-analysis" : "random"

    const result = {
      horseFact,
      message: `Here's your personalized horse fact based on your recent casts!`,
      analysis: {
        castsAnalyzed: userCasts.length,
        userName: userName,
        method: method,
      },
    }

    console.log(`✅ Backend: Returning fact #${horseFact.id} via ${method} method`)
    return NextResponse.json(result)
  } catch (error) {
    console.error("❌ Backend error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
