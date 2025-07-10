// Horse facts and their corresponding images
export interface HorseFact {
  id: number
  image: string
  fact: string
}

export const horseFacts: HorseFact[] = [
  {
    id: 1,
    image: "/1.png",
    fact: "Horses cannot breathe through their mouth – only through their nostrils",
  },
  {
    id: 2,
    image: "/2.png",
    fact: "Their eyes are located on the sides of their head, providing almost 360-degree vision, but there are blind spots in front and behind",
  },
  {
    id: 3,
    image: "/3.png",
    fact: "Horses have the largest eyes among all terrestrial mammals",
  },
  {
    id: 4,
    image: "/4.png",
    fact: 'They can sleep standing up thanks to a "locking mechanism" in their joints, but they need to lie down for deep sleep',
  },
  {
    id: 5,
    image: "/5.png",
    fact: "A horse's heart weighs about 4-5 kg and can pump up to 250 liters of blood per minute during intense running",
  },
  {
    id: 6,
    image: "/6.png",
    fact: "Horse teeth grow throughout their lifetime, and their age can be determined by tooth wear",
  },
  {
    id: 7,
    image: "/7.png",
    fact: "Horses don't have a gallbladder, but this doesn't prevent them from digesting plant food",
  },
  {
    id: 8,
    image: "/8.png",
    fact: "Horses have excellent memory and can recognize people after years",
  },
  {
    id: 9,
    image: "/9.png",
    fact: "They use facial expressions to communicate, having more than 17 facial expressions",
  },
  {
    id: 10,
    image: "/10.png",
    fact: "Horses are capable of learning to open doors, unscrew caps, and use simple mechanisms",
  },
]

// Get a random horse fact
export function getRandomHorseFact(): HorseFact {
  const randomIndex = Math.floor(Math.random() * horseFacts.length)
  return horseFacts[randomIndex]
}

// Get horse fact by ID
export function getHorseFactById(id: number): HorseFact | undefined {
  return horseFacts.find((fact) => fact.id === id)
}
