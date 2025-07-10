import type { HorseFact } from "./horse-facts"
import { horseFacts } from "./horse-facts"

// Ключевые слова для каждого факта о лошадях
export const factKeywords: Record<number, string[]> = {
  1: [
    // Факт о дыхании через ноздри
    "breathe",
    "breathing",
    "nose",
    "mouth",
    "air",
    "oxygen",
    "respiratory",
    "nostrils",
    "дышать",
    "дыхание",
    "нос",
    "рот",
    "воздух",
    "кислород",
    "дыхательный",
    "ноздри",
    "health",
    "medical",
    "anatomy",
    "biology",
    "science",
    "body",
    "физиология",
    "здоровье",
  ],
  2: [
    // Факт о зрении 360 градусов
    "see",
    "vision",
    "eyes",
    "sight",
    "look",
    "watch",
    "view",
    "observe",
    "blind",
    "видеть",
    "зрение",
    "глаза",
    "смотреть",
    "наблюдать",
    "слепой",
    "обзор",
    "perspective",
    "angle",
    "around",
    "behind",
    "front",
    "side",
    "перспектива",
    "угол",
  ],
  3: [
    // Факт о самых больших глазах
    "big",
    "large",
    "huge",
    "giant",
    "massive",
    "enormous",
    "biggest",
    "largest",
    "большой",
    "огромный",
    "гигантский",
    "массивный",
    "крупный",
    "самый большой",
    "eyes",
    "eye",
    "vision",
    "sight",
    "глаза",
    "глаз",
    "зрение",
    "размер",
    "size",
  ],
  4: [
    // Факт о сне стоя
    "sleep",
    "sleeping",
    "rest",
    "tired",
    "bed",
    "night",
    "dream",
    "nap",
    "standing",
    "спать",
    "сон",
    "отдых",
    "усталый",
    "кровать",
    "ночь",
    "мечта",
    "дремать",
    "стоя",
    "lie",
    "lying",
    "deep",
    "mechanism",
    "joints",
    "лежать",
    "глубокий",
    "механизм",
  ],
  5: [
    // Факт о сердце и крови
    "heart",
    "blood",
    "pump",
    "running",
    "exercise",
    "fitness",
    "cardio",
    "circulation",
    "сердце",
    "кровь",
    "насос",
    "бег",
    "упражнения",
    "фитнес",
    "кардио",
    "циркуляция",
    "intense",
    "workout",
    "training",
    "sport",
    "athletic",
    "интенсивный",
    "тренировка",
    "спорт",
  ],
  6: [
    // Факт о зубах и возрасте
    "teeth",
    "tooth",
    "age",
    "old",
    "young",
    "grow",
    "growing",
    "lifetime",
    "wear",
    "зубы",
    "зуб",
    "возраст",
    "старый",
    "молодой",
    "расти",
    "рост",
    "жизнь",
    "износ",
    "dental",
    "bite",
    "chew",
    "eating",
    "food",
    "зубной",
    "кусать",
    "жевать",
    "еда",
  ],
  7: [
    // Факт о желчном пузыре
    "digest",
    "digestion",
    "food",
    "eat",
    "eating",
    "stomach",
    "plant",
    "vegetarian",
    "переваривать",
    "пищеварение",
    "еда",
    "есть",
    "желудок",
    "растение",
    "вегетарианский",
    "gallbladder",
    "organ",
    "anatomy",
    "biology",
    "желчный",
    "орган",
    "анатомия",
    "биология",
  ],
  8: [
    // Факт о памяти
    "memory",
    "remember",
    "forget",
    "recognize",
    "people",
    "friends",
    "family",
    "years",
    "память",
    "помнить",
    "забывать",
    "узнавать",
    "люди",
    "друзья",
    "семья",
    "годы",
    "excellent",
    "good",
    "brain",
    "mind",
    "intelligence",
    "отличный",
    "хороший",
    "мозг",
    "ум",
  ],
  9: [
    // Факт о мимике
    "face",
    "expression",
    "communicate",
    "emotion",
    "feeling",
    "smile",
    "sad",
    "happy",
    "лицо",
    "выражение",
    "общаться",
    "эмоция",
    "чувство",
    "улыбка",
    "грустный",
    "счастливый",
    "facial",
    "communication",
    "social",
    "лицевой",
    "общение",
    "социальный",
    "мимика",
  ],
  10: [
    // Факт об интеллекте
    "smart",
    "intelligent",
    "learn",
    "learning",
    "door",
    "open",
    "mechanism",
    "clever",
    "умный",
    "интеллектуальный",
    "учиться",
    "обучение",
    "дверь",
    "открывать",
    "механизм",
    "сообразительный",
    "solve",
    "problem",
    "think",
    "thinking",
    "решать",
    "проблема",
    "думать",
    "мышление",
  ],
}

// Функция для анализа текста и подсчета совпадений
export function analyzeTextForKeywords(text: string): Record<number, number> {
  const scores: Record<number, number> = {}
  const normalizedText = text.toLowerCase()

  // Инициализируем счетчики для всех фактов
  Object.keys(factKeywords).forEach((factId) => {
    scores[Number(factId)] = 0
  })

  // Подсчитываем совпадения для каждого факта
  Object.entries(factKeywords).forEach(([factId, keywords]) => {
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "gi")
      const matches = normalizedText.match(regex)
      if (matches) {
        scores[Number(factId)] += matches.length
      }
    })
  })

  return scores
}

// Функция для выбора лучшего факта на основе анализа
export function selectBestHorseFact(userPosts: string[]): HorseFact {
  if (!userPosts || userPosts.length === 0) {
    // Если нет постов, возвращаем случайный факт
    return getRandomHorseFact()
  }

  // Объединяем все посты в один текст
  const combinedText = userPosts.join(" ")

  // Анализируем текст
  const scores = analyzeTextForKeywords(combinedText)

  // Находим факт с наивысшим счетом
  let bestFactId = 1
  let maxScore = scores[1]

  Object.entries(scores).forEach(([factId, score]) => {
    if (score > maxScore) {
      maxScore = score
      bestFactId = Number(factId)
    }
  })

  // Если все счета равны 0, возвращаем случайный факт
  if (maxScore === 0) {
    return getRandomHorseFact()
  }

  // Возвращаем факт с наивысшим счетом
  const selectedFact = horseFacts.find((fact) => fact.id === bestFactId)
  return selectedFact || getRandomHorseFact()
}

// Вспомогательная функция для случайного выбора (если анализ не дал результатов)
function getRandomHorseFact(): HorseFact {
  const randomIndex = Math.floor(Math.random() * horseFacts.length)
  return horseFacts[randomIndex]
}

// Функция для получения топ-3 наиболее подходящих фактов
export function getTopMatchingFacts(userPosts: string[], count = 3): HorseFact[] {
  if (!userPosts || userPosts.length === 0) {
    // Возвращаем случайные факты
    return horseFacts.sort(() => Math.random() - 0.5).slice(0, count)
  }

  const combinedText = userPosts.join(" ")
  const scores = analyzeTextForKeywords(combinedText)

  // Сортируем факты по счету
  const sortedFacts = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([factId]) => {
      const fact = horseFacts.find((f) => f.id === Number(factId))
      return fact!
    })
    .filter(Boolean)

  // Если не хватает фактов, добавляем случайные
  while (sortedFacts.length < count) {
    const randomFact = getRandomHorseFact()
    if (!sortedFacts.find((f) => f.id === randomFact.id)) {
      sortedFacts.push(randomFact)
    }
  }

  return sortedFacts
}

// Функция для отладки - показывает, какие слова найдены
export function debugWordMatching(userPosts: string[]): {
  combinedText: string
  scores: Record<number, number>
  foundKeywords: Record<number, string[]>
} {
  const combinedText = userPosts.join(" ")
  const scores = analyzeTextForKeywords(combinedText)
  const foundKeywords: Record<number, string[]> = {}

  const normalizedText = combinedText.toLowerCase()

  Object.entries(factKeywords).forEach(([factId, keywords]) => {
    foundKeywords[Number(factId)] = []
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "gi")
      if (normalizedText.match(regex)) {
        foundKeywords[Number(factId)].push(keyword)
      }
    })
  })

  return {
    combinedText,
    scores,
    foundKeywords,
  }
}
