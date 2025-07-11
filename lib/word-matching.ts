import { horseFacts } from "./horse-facts"
import type { HorseFact } from "./horse-facts"

// Keywords mapped to horse fact categories
const keywordMap: Record<string, string[]> = {
  // Speed and racing
  speed: ["fast", "quick", "rapid", "swift", "racing", "run", "gallop", "sprint", "velocity", "mph"],

  // Strength and power
  strength: ["strong", "powerful", "muscle", "force", "lift", "pull", "carry", "weight", "power"],

  // Intelligence and learning
  intelligence: ["smart", "intelligent", "learn", "memory", "remember", "think", "brain", "clever", "wise"],

  // Vision and senses
  vision: ["see", "eyes", "vision", "sight", "look", "watch", "observe", "view", "visual"],

  // Sleep and rest
  sleep: ["sleep", "rest", "tired", "nap", "dream", "wake", "bed", "lying", "standing"],

  // Communication
  communication: ["talk", "speak", "voice", "sound", "neigh", "whinny", "communicate", "language"],

  // Anatomy and body
  anatomy: ["body", "legs", "hooves", "tail", "mane", "teeth", "heart", "bones", "skeleton"],

  // Behavior and emotions
  behavior: ["happy", "sad", "angry", "calm", "excited", "nervous", "friendly", "social", "behavior"],

  // History and evolution
  history: ["ancient", "old", "evolution", "wild", "domestic", "history", "prehistoric", "ancestor"],

  // Care and health
  care: ["care", "health", "vet", "medicine", "sick", "healthy", "doctor", "treatment", "grooming"],

  // General horse terms
  general: ["horse", "pony", "stallion", "mare", "foal", "colt", "filly", "equine", "stable", "barn"],
}

// Fact categories mapped to fact IDs
const factCategories: Record<string, number[]> = {
  speed: [1, 5, 8],
  strength: [2, 6],
  intelligence: [3, 7, 9],
  vision: [4],
  sleep: [10],
  communication: [3, 7],
  anatomy: [2, 4, 6, 8],
  behavior: [3, 7, 9],
  history: [1, 5],
  care: [9, 10],
  general: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}

export function selectBestHorseFact(userCasts: string[]): HorseFact {
  console.log("🔍 Starting keyword analysis for casts:", userCasts.length)

  if (!userCasts || userCasts.length === 0) {
    console.log("📝 No casts provided, selecting random fact")
    return getRandomHorseFact()
  }

  // Combine all cast text into one string for analysis
  const allText = userCasts.join(" ").toLowerCase()
  console.log("📄 Combined text length:", allText.length)

  // Score each category based on keyword matches
  const categoryScores: Record<string, number> = {}

  Object.entries(keywordMap).forEach(([category, keywords]) => {
    let score = 0
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "g")) || []).length
      score += matches
      if (matches > 0) {
        console.log(`🎯 Found "${keyword}" ${matches} times in category "${category}"`)
      }
    })
    categoryScores[category] = score
  })

  console.log("📊 Category scores:", categoryScores)

  // Find the category with the highest score
  const bestCategory = Object.entries(categoryScores)
    .filter(([_, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)[0]

  if (!bestCategory) {
    console.log("🎲 No keyword matches found, selecting random fact")
    return getRandomHorseFact()
  }

  const [categoryName, score] = bestCategory
  console.log(`🏆 Best matching category: "${categoryName}" with score ${score}`)

  // Get facts from the best matching category
  const categoryFactIds = factCategories[categoryName] || []
  const availableFacts = horseFacts.filter((fact) => categoryFactIds.includes(fact.id))

  if (availableFacts.length === 0) {
    console.log("⚠️ No facts found for category, selecting random fact")
    return getRandomHorseFact()
  }

  // Select a random fact from the matching category
  const selectedFact = availableFacts[Math.floor(Math.random() * availableFacts.length)]
  console.log(`✅ Selected fact #${selectedFact.id} from category "${categoryName}"`)

  return selectedFact
}

export function getTopMatchingFacts(userCasts: string[], limit = 3): HorseFact[] {
  if (!userCasts || userCasts.length === 0) {
    return horseFacts.slice(0, limit)
  }

  const allText = userCasts.join(" ").toLowerCase()
  const categoryScores: Record<string, number> = {}

  Object.entries(keywordMap).forEach(([category, keywords]) => {
    let score = 0
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "g")) || []).length
      score += matches
    })
    categoryScores[category] = score
  })

  // Get top categories
  const topCategories = Object.entries(categoryScores)
    .filter(([_, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category)

  if (topCategories.length === 0) {
    return horseFacts.slice(0, limit)
  }

  // Collect facts from top categories
  const matchingFacts: HorseFact[] = []
  topCategories.forEach((category) => {
    const categoryFactIds = factCategories[category] || []
    const categoryFacts = horseFacts.filter((fact) => categoryFactIds.includes(fact.id))
    matchingFacts.push(...categoryFacts)
  })

  // Remove duplicates and limit results
  const uniqueFacts = Array.from(new Map(matchingFacts.map((fact) => [fact.id, fact])).values())
  return uniqueFacts.slice(0, limit)
}

function getRandomHorseFact(): HorseFact {
  return horseFacts[Math.floor(Math.random() * horseFacts.length)]
}

// Debug function to test word matching
export function debugWordMatching(userCasts: string[]): void {
  console.log("🐴 DEBUG: Word Matching Analysis")
  console.log("📝 Input casts:", userCasts)

  const allText = userCasts.join(" ").toLowerCase()
  console.log("📄 Combined text:", allText)

  Object.entries(keywordMap).forEach(([category, keywords]) => {
    console.log(`\n📂 Category: ${category}`)
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "g")) || []).length
      if (matches > 0) {
        console.log(`  ✅ "${keyword}": ${matches} matches`)
      }
    })
  })

  const selectedFact = selectBestHorseFact(userCasts)
  console.log("\n🎯 Selected fact:", selectedFact)
}
