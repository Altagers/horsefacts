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

    // Check if Neynar API key is configured (optional for basic functionality)
    if (process.env.NEYNAR_API_KEY) {
      try {
        // Try to get basic user info using free API
        console.log(`Backend: Querying Neynar API for user info for FID: ${fid}`)

        const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            api_key: process.env.NEYNAR_API_KEY,
          },
        })

        if (neynarResponse.ok) {
          const neynarData = await neynarResponse.json()
          const user = neynarData.users?.[0]
          console.log(`Backend: Successfully fetched user info for ${user?.username || "unknown user"}`)
        } else {
          console.log(`Backend: Neynar API returned ${neynarResponse.status}, proceeding without user data`)
        }
      } catch (neynarError) {
        console.log(`Backend: Neynar API error, proceeding without user data:`, neynarError)
      }
    }

    // Always return a random horse fact regardless of API availability
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
