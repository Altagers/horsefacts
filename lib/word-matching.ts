import { horseFacts, type HorseFact } from "./horse-facts"

// Keywords for different categories of horse facts
const KEYWORD_CATEGORIES = {
  speed: ["fast", "speed", "quick", "run", "racing", "race", "sprint", "gallop", "mph", "velocity"],
  anatomy: ["body", "heart", "eyes", "teeth", "bones", "muscle", "anatomy", "physical", "size", "weight"],
  behavior: ["sleep", "behavior", "social", "herd", "communication", "emotion", "smart", "intelligent"],
  history: ["ancient", "history", "evolution", "wild", "domesticated", "civilization", "culture"],
  care: ["feed", "food", "care", "health", "veterinary", "grooming", "stable", "pasture"],
  breeds: ["breed", "type", "arabian", "thoroughbred", "mustang", "pony", "stallion", "mare"],
  sports: ["riding", "equestrian", "jumping", "dressage", "polo", "rodeo", "cowboy", "western"],
  general: ["horse", "horses", "equine", "pony", "ponies", "foal", "colt", "filly"],
}

// Assign categories to horse facts based on their content
const FACT_CATEGORIES: Record<number, string[]> = {
  1: ["speed", "general"], // Speed fact
  2: ["anatomy", "general"], // Heart fact
  3: ["anatomy", "general"], // Eyes fact
  4: ["behavior", "general"], // Sleep fact
  5: ["anatomy", "general"], // Teeth fact
  6: ["behavior", "general"], // Communication fact
  7: ["anatomy", "general"], // Bones fact
  8: ["history", "general"], // Evolution fact
  9: ["behavior", "general"], // Memory fact
  10: ["anatomy", "general"], // Muscle fact
}

export function selectBestHorseFact(userCasts: string[]): { fact: HorseFact; method: "keyword-analysis" | "random" } {
  if (!userCasts || userCasts.length === 0) {
    console.log("No casts provided, selecting random fact")
    return {
      fact: horseFacts[Math.floor(Math.random() * horseFacts.length)],
      method: "random",
    }
  }

  // Combine all cast text into one string for analysis
  const allText = userCasts.join(" ").toLowerCase()
  console.log("Analyzing cast text:", allText.substring(0, 200) + "...")

  // Count keyword matches for each category
  const categoryScores: Record<string, number> = {}

  Object.entries(KEYWORD_CATEGORIES).forEach(([category, keywords]) => {
    categoryScores[category] = 0
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "gi")) || []).length
      categoryScores[category] += matches
      if (matches > 0) {
        console.log(`Found "${keyword}" ${matches} times in category "${category}"`)
      }
    })
  })

  console.log("Category scores:", categoryScores)

  // Find the category with the highest score
  const topCategory = Object.entries(categoryScores)
    .filter(([_, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)[0]

  if (!topCategory) {
    console.log("No keyword matches found, selecting random fact")
    return {
      fact: horseFacts[Math.floor(Math.random() * horseFacts.length)],
      method: "random",
    }
  }

  console.log(`Top category: ${topCategory[0]} with score ${topCategory[1]}`)

  // Find facts that match the top category
  const matchingFacts = horseFacts.filter((fact) => {
    const factCategories = FACT_CATEGORIES[fact.id] || ["general"]
    return factCategories.includes(topCategory[0])
  })

  if (matchingFacts.length === 0) {
    console.log("No facts found for top category, selecting random fact")
    return {
      fact: horseFacts[Math.floor(Math.random() * horseFacts.length)],
      method: "random",
    }
  }

  const selectedFact = matchingFacts[Math.floor(Math.random() * matchingFacts.length)]
  console.log(`Selected fact #${selectedFact.id} from category "${topCategory[0]}"`)

  return {
    fact: selectedFact,
    method: "keyword-analysis",
  }
}

// Helper function for debugging
export function getTopMatchingFacts(
  userCasts: string[],
  limit = 3,
): Array<{ fact: HorseFact; score: number; categories: string[] }> {
  const allText = userCasts.join(" ").toLowerCase()

  return horseFacts
    .map((fact) => {
      const factCategories = FACT_CATEGORIES[fact.id] || ["general"]
      let totalScore = 0

      factCategories.forEach((category) => {
        const keywords = KEYWORD_CATEGORIES[category] || []
        keywords.forEach((keyword) => {
          const matches = (allText.match(new RegExp(keyword, "gi")) || []).length
          totalScore += matches
        })
      })

      return {
        fact,
        score: totalScore,
        categories: factCategories,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

// Debug function to see what keywords are being matched
export function debugWordMatching(userCasts: string[]): void {
  const allText = userCasts.join(" ").toLowerCase()
  console.log("=== WORD MATCHING DEBUG ===")
  console.log("Cast text:", allText)

  Object.entries(KEYWORD_CATEGORIES).forEach(([category, keywords]) => {
    console.log(`\n${category.toUpperCase()}:`)
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "gi")) || []).length
      if (matches > 0) {
        console.log(`  ✓ "${keyword}": ${matches} matches`)
      }
    })
  })

  console.log("\nTop matching facts:")
  getTopMatchingFacts(userCasts, 5).forEach(({ fact, score, categories }) => {
    console.log(`  Fact #${fact.id}: ${score} points (${categories.join(", ")})`)
  })
}
