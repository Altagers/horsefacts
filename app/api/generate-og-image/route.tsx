import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { getHorseFactById } from "@/lib/horse-facts"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const factId = searchParams.get("factId")
    const factImage = searchParams.get("factImage")

    // Hardcode the base URL for reliability
    const baseUrl = "https://v0-powerpuff-girls-ow.vercel.app"

    if (!factId || !factImage) {
      return new Response("Missing horse fact information", { status: 400 })
    }

    const horseFactData = getHorseFactById(Number.parseInt(factId))
    if (!horseFactData) {
      return new Response("Horse fact not found", { status: 404 })
    }

    // Construct absolute URL for the horse fact image
    const horseImageUrl = new URL(factImage, baseUrl).toString()

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#8B4513", // Saddle brown
          padding: "40px",
          border: "10px solid #2F1B14", // Dark brown
          borderRadius: "30px",
        }}
      >
        <img
          src={horseImageUrl || "/placeholder.svg"}
          width={300}
          height={300}
          style={{ borderRadius: "20px", border: "8px solid #2F1B14", marginBottom: "30px" }}
          alt={`Horse Fact ${factId}`}
        />
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textShadow: "4px 4px 0 #2F1B14, -4px -4px 0 #2F1B14, 4px -4px 0 #2F1B14, -4px 4px 0 #2F1B14",
            margin: "0 0 20px 0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Horse Fact #{factId} 🐴
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "white",
            textAlign: "center",
            maxWidth: "90%",
            lineHeight: 1.4,
            textShadow: "2px 2px 0 #2F1B14",
          }}
        >
          {horseFactData.fact}
        </p>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.error(`OG Image Error: Failed to generate ImageResponse:`, e.message)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
