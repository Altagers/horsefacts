import { type NextRequest, NextResponse } from "next/server"
import { getRandomHorseFact } from "@/lib/horse-facts"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fid = body.fid // Get FID from request body

    if (!fid) {
      throw new Error("FID not provided in the request body")
    }

    console.log(`Backend: Received request to analyze FID: ${fid}`)

    // 1. Fetch user casts from Neynar API
    if (!process.env.NEYNAR_API_KEY) {
      throw new Error("Neynar API key not configured")
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
    }

    console.log(`Backend: Querying Neynar API for FID: ${fid}`)

    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/popular?fid=${fid}&limit=10`, {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY,
      },
    })

    if (!neynarResponse.ok) {
      const errorText = await neynarResponse.text()
      console.error(`Backend: Neynar API error for FID ${fid}: ${errorText}`)
      throw new Error(`Neynar API error: ${neynarResponse.status} - ${errorText}`)
    }

    const neynarData = await neynarResponse.json()
    const castTexts = neynarData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    // Always return a random horse fact regardless of posts
    const horseFact = getRandomHorseFact()

    console.log(`Backend: Selected horse fact ${horseFact.id} for FID ${fid}`)

    return NextResponse.json({
      horseFact: horseFact,
      message: "Here's an amazing horse fact just for you!",
    })
  } catch (error) {
    console.error("Backend: Error in analyze-user route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch horse fact",
      },
      { status: 500 },
    )
  }
}
