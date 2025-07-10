import { horseFacts } from "./horse-facts"
import type { HorseFact } from "./horse-facts"

// Keywords for different categories of horse facts
const keywordCategories = {
  speed: ["fast", "speed", "quick", "run", "racing", "gallop", "mph", "velocity", "sprint", "dash"],
  anatomy: ["body", "heart", "eyes", "teeth", "hooves", "mane", "tail", "muscle", "bone", "anatomy"],
  behavior: ["sleep", "dream", "social", "herd", "communicate", "behavior", "emotion", "memory", "intelligence"],
  history: ["ancient", "evolution", "wild", "domesticated", "history", "civilization", "culture", "tradition"],
  breeds: ["breed", "arabian", "thoroughbred", "mustang", "clydesdale", "pony", "stallion", "mare"],
  care: ["feed", "water", "grooming", "veterinary", "health", "care", "stable", "pasture"],
  sports: ["riding", "equestrian", "jumping", "dressage", "polo", "rodeo", "competition", "olympic"],
  nature: ["wild", "freedom", "plains", "grassland", "natural", "environment", "habitat", "wilderness"],
}

// Function to extract keywords from user casts
function extractKeywords(userCasts: string[]): string[] {
  const allText = userCasts.join(" ").toLowerCase()
  const words = allText.match(/\b\w+\b/g) || []

  // Filter out common words and keep meaningful ones
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
  ])

  return words.filter((word) => word.length > 2 && !stopWords.has(word))
}

// Function to calculate relevance score for a horse fact
function calculateRelevanceScore(horseFact: HorseFact, userKeywords: string[]): number {
  let score = 0
  const factText = horseFact.fact.toLowerCase()

  // Check for direct keyword matches in the fact
  userKeywords.forEach((keyword) => {
    if (factText.includes(keyword)) {
      score += 3 // High score for direct matches
    }
  })

  // Check for category matches
  Object.entries(keywordCategories).forEach(([category, categoryKeywords]) => {
    const userHasCategoryKeywords = userKeywords.some((keyword) =>
      categoryKeywords.some((catKeyword) => keyword.includes(catKeyword) || catKeyword.includes(keyword)),
    )

    if (userHasCategoryKeywords) {
      const factHasCategoryKeywords = categoryKeywords.some((catKeyword) => factText.includes(catKeyword))

      if (factHasCategoryKeywords) {
        score += 2 // Medium score for category matches
      }
    }
  })

  // Bonus for semantic similarity (simple approach)
  const { speed, anatomy } = keywordCategories // Declare categoryKeywords variable
  userKeywords.forEach((keyword) => {
    speed.forEach((speedWord) => {
      if (keyword.includes(speedWord) && factText.includes("fast")) score += 1
    })
    anatomy.forEach((anatomyWord) => {
      if (keyword.includes(anatomyWord) && (factText.includes("body") || factText.includes("heart"))) score += 1
    })
  })

  return score
}

// Main function to select the best horse fact based on user casts
export function selectBestHorseFact(userCasts: string[]): HorseFact {
  if (!userCasts || userCasts.length === 0) {
    // Return random fact if no casts
    return horseFacts[Math.floor(Math.random() * horseFacts.length)]
  }

  const userKeywords = extractKeywords(userCasts)
  console.log("Extracted keywords:", userKeywords)

  if (userKeywords.length === 0) {
    // Return random fact if no meaningful keywords
    return horseFacts[Math.floor(Math.random() * horseFacts.length)]
  }

  // Calculate scores for all horse facts
  const scoredFacts = horseFacts.map((fact) => ({
    fact,
    score: calculateRelevanceScore(fact, userKeywords),
  }))

  // Sort by score (highest first)
  scoredFacts.sort((a, b) => b.score - a.score)

  console.log(
    "Top 5 scored facts:",
    scoredFacts.slice(0, 5).map((sf) => ({ id: sf.fact.id, score: sf.score })),
  )

  // If the top score is 0, return a random fact
  if (scoredFacts[0].score === 0) {
    return horseFacts[Math.floor(Math.random() * horseFacts.length)]
  }

  // Get all facts with the highest score
  const topScore = scoredFacts[0].score
  const topFacts = scoredFacts.filter((sf) => sf.score === topScore)

  // Return a random fact from the top-scoring facts
  return topFacts[Math.floor(Math.random() * topFacts.length)].fact
}

// Helper function to get top matching facts (for debugging)
export function getTopMatchingFacts(userCasts: string[], limit = 5): Array<{ fact: HorseFact; score: number }> {
  const userKeywords = extractKeywords(userCasts)

  const scoredFacts = horseFacts.map((fact) => ({
    fact,
    score: calculateRelevanceScore(fact, userKeywords),
  }))

  return scoredFacts.sort((a, b) => b.score - a.score).slice(0, limit)
}

// Debug function to analyze word matching
export function debugWordMatching(userCasts: string[]): void {
  const userKeywords = extractKeywords(userCasts)
  console.log("User keywords:", userKeywords)

  const topFacts = getTopMatchingFacts(userCasts, 3)
  console.log("Top matching facts:")
  topFacts.forEach((item, index) => {
    console.log(`${index + 1}. Fact #${item.fact.id} (Score: ${item.score}): ${item.fact.fact.substring(0, 100)}...`)
  })
}
