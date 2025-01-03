const easyDeck = ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐨"];
const mediumDeck = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐷",
  "🐥",
  "🐸",
  "🐍",
];
const hardDeck = [
  "🐿️",
  "🦫",
  "🦮",
  "🐕‍🦺",
  "🦌",
  "🦒",
  "🐪",
  "🐫",
  "🐉",
  "🦎",
  "🦀",
  "🦞",
];
export const createShuffledDeck = ({
  difficulty = "easy",
}: {
  difficulty?: string;
}) => {
  let values: string[] = []; // Card values
  switch (difficulty) {
    case "hard":
      values = hardDeck;
      break;
    case "medium":
      values = mediumDeck;
      break;
    case "easy":
    default:
      values = easyDeck;
      break;
  }

  const deck = [...values, ...values] // Duplicate values for pairs
    .map((value, index) => ({
      id: index,
      value,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5); // Shuffle the deck
  return deck;
};
