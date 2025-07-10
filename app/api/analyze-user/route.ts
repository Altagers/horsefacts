import { type NextRequest, NextResponse } from "next/server"
import { selectBestHorseFact, debugWordMatching } from "@/lib/word-matching"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fid = body.fid

    if (!fid) {
      throw new Error("FID not provided in the request body")
    }

    console.log(`Backend: Received request to analyze FID: ${fid}`)

    let userCasts: string[] = []
    let userName = "unknown user"

    // Получаем касты пользователя через Neynar API
    if (process.env.NEYNAR_API_KEY) {
      try {
        console.log(`Backend: Fetching user casts for FID: ${fid}`)

        // Сначала получаем информацию о пользователе
        const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            api_key: process.env.NEYNAR_API_KEY,
          },
        })

        if (userResponse.ok) {
          const userData = await userResponse.json()
          const user = userData.users?.[0]
          userName = user?.username || "unknown user"
          console.log(`Backend: Successfully fetched user info for ${userName}`)
        }

        // Получаем последние касты пользователя
        const castsResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=10`, {
          method: "GET",
          headers: {
            accept: "application/json",
            api_key: process.env.NEYNAR_API_KEY,
          },
        })

        if (castsResponse.ok) {
          const castsData = await castsResponse.json()
          const casts = castsData.casts || []

          // Извлекаем текст из кастов
          userCasts = casts
            .map((cast: any) => cast.text)
            .filter((text: string) => text && text.trim().length > 0)
            .slice(0, 10) // Берем максимум 10 кастов

          console.log(`Backend: Successfully fetched ${userCasts.length} casts for ${userName}`)
          console.log(`Backend: Sample casts:`, userCasts.slice(0, 2))
        } else {
          console.log(`Backend: Failed to fetch casts, status: ${castsResponse.status}`)
        }
      } catch (neynarError) {
        console.log(`Backend: Neynar API error:`, neynarError)
      }
    }

    // Анализируем касты и выбираем подходящий факт
    const selectedFact = selectBestHorseFact(userCasts)

    // Для отладки - показываем, что было найдено
    if (userCasts.length > 0) {
      const debugInfo = debugWordMatching(userCasts)
      console.log(`Backend: Analysis for ${userName}:`)
      console.log(`- Casts analyzed: ${userCasts.length}`)
      console.log(`- Combined text length: ${debugInfo.combinedText.length}`)
      console.log(`- Scores:`, debugInfo.scores)
      console.log(`- Found keywords:`, debugInfo.foundKeywords)
      console.log(`- Selected fact: #${selectedFact.id}`)
    }

    return NextResponse.json({
      horseFact: selectedFact,
      message:
        userCasts.length > 0
          ? `Based on your casts, here's a horse fact that matches your interests!`
          : "Here's an amazing horse fact just for you!",
      analysis: {
        castsAnalyzed: userCasts.length,
        userName: userName,
        method: userCasts.length > 0 ? "keyword-analysis" : "random",
      },
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
