"use client";
import React, { useEffect, useState } from "react";
import { createShuffledDeck } from "@/utils/createShuffleDeck";
import { Card } from "./Card";
import { delay, motion } from "framer-motion";
import {
  CardTitle,
  Card as CardShadcn,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileQuestionIcon, MessageCircleQuestion } from "lucide-react";

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
  console.log({ finalScore, score });

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
      <div className="flex flex-row relative w-full justify-center">
        <div className="grid grid-cols-4 gap-4 p-4">
          {deck.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <motion.div
          className="bg-transparent p-2 absolute right-5 top-0 rounded shadow-md border-purple-950 dark:border-blue-800"
          transition={delay}
          initial={{ backgroundColor: "purple" }}
          animate={{ backgroundColor: "transparent" }}
        >
          <CardTitle className="text-center">Scores</CardTitle>
          <CardContent className="p-2">
            <div className="mt-4">
              <p className="text-lg">Flips: {flips}</p>
              <p className="text-lg">Score: {finalScore}</p>

              <p className="text-lg">Match Streak: {matchStreak}</p>
              {allMatched && (
                <p className="text-lg font-bold text-green-600">
                  You Win! Final Score: {finalScore}
                </p>
              )}
            </div>
          </CardContent>
        </motion.div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-md"
        onClick={restartGame}
      >
        Restart Game
      </button>
    </div>
  );
};
export default MemoryGame;
