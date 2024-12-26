export const createShuffledDeck = () => {
    const values = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨']; // Card values
    const deck = [...values, ...values] // Duplicate values for pairs
      .map((value, index) => ({
        id: index,
        value,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5); // Shuffle the deck
    return deck;
  };
  