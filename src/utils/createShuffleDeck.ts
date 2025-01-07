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
export const createShuffledDeck = (difficulty?: string) => {
  const values = (() => {
    switch (difficulty) {
      case "hard":
        return hardDeck;
      case "medium":
        return mediumDeck;
      case "easy":
      default:
        return easyDeck;
    }
  })();

  return [...values, ...values] // Duplicate values for pairs
    .map((value, index) => ({
      id: index,
      value,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5); // Shuffle the deck
};
