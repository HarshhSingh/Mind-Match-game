import { motion } from "framer-motion";

interface ScoreboardProps {
  score: number;
  flips: number;
  matchStreak: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  score,
  flips,
  matchStreak,
}) => {
  return (
    <motion.div
      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg absolute right-5 "
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 className="text-2xl font-bold mb-2">Scoreboard</motion.h2>
      <motion.div
        className="text-xl"
        key={score}
        initial={{ scale: 1.5, color: "#4CAF50" }}
        animate={{ scale: 1, color: "#FFFFFF" }}
        transition={{ duration: 0.5 }}
      >
        Score: {score}
      </motion.div>
      <motion.div>Flips: {flips}</motion.div>
      <motion.div>Match Streak: {matchStreak}</motion.div>
    </motion.div>
  );
};
