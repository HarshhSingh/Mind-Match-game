"use client";
import React, { useState } from "react";
import { createShuffledDeck } from "@/utils/createShuffleDeck";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleQuestion } from "lucide-react";
import { Scoreboard } from "@/components/Scoreboard";
import { StickerCard } from "@/components/StickerCard";

const MemoryGame = () => {
  const [deck, setDeck] = useState(createShuffledDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(1000);
  const [flips, setFlips] = useState(0);
  const [matchStreak, setMatchStreak] = useState(0);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length < 2 &&
      !deck[index].matched &&
      !flippedCards.includes(index)
    ) {
      setFlips((prev) => prev + 1);
      setFlippedCards((prev) => [...prev, index]);

      if (flippedCards.length === 1) {
        const firstIndex = flippedCards[0];
        if (deck[firstIndex].value === deck[index].value) {
          setDeck((prev) =>
            prev.map((card, i) =>
              i === firstIndex || i === index
                ? { ...card, matched: true }
                : card
            )
          );
          setMatchStreak((prev) => prev + 1);
          setScore((prev) => prev + 50 + matchStreak * 50); // Bonus for correct match + Streak Points
        } else {
          setScore((prev) => prev - 20); // Penalty for wrong match
          setMatchStreak(0);
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };
  const allMatched = deck.every((card) => card.matched);
  const idealFlips = deck.length;
  const extraFlipsPenalty = Math.max(flips - idealFlips, 0) * 10; // 10 points per extra flip
  const finalScore = Math.max(score - extraFlipsPenalty, 0);
  console.log({ finalScore, deck });

  const restartGame = () => {
    setDeck(createShuffledDeck());
    setFlippedCards([]);
    setFlips(0);
    setMatchStreak(0);
    setScore(1000);
  };

  return (
    <div className="flex flex-col items-center h-full gap-10">
      <h1 className="text-xl font-bold p-3 text-slate-800 dark:text-white">
        How's your memory??{" "}
      </h1>
      <div className="absolute top-4 right-4 hover:bg-transparent">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MessageCircleQuestion color="white" />
            </TooltipTrigger>
            <TooltipContent className="-translate-x-1/2 mt-2 w-64 p-4 bg-gray-700 text-white text-sm rounded shadow-lg z-10">
              <ul className="list-disc ml-4">
                <li>Flip two cards per turn.</li>
                <li>Match pairs to clear the board.</li>
                <li>Each incorrect match reduces your score.</li>
                <li>
                  Complete the game with the fewest flips for a higher score.
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {!allMatched ? (
        <>
          <div className="flex flex-row relative w-full justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-4 gap-4 p-4"
            >
              {deck.map((card, index) => (
                <StickerCard
                  key={card.id}
                  card={card}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </motion.div>

            <Scoreboard
              score={finalScore}
              flips={flips}
              matchStreak={matchStreak}
            />
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-md"
            onClick={restartGame}
          >
            Restart Game
          </motion.button>
        </>
      ) : (
        <motion.div
          className="mt-8 p-4 bg-white rounded-lg shadow-lg w-1/3 text-center  "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p>Final Score: {finalScore}</p>
          <p>Total Flips: {flips}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={restartGame}
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};
export default MemoryGame;
