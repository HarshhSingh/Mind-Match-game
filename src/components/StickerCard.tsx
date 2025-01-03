import { motion } from "framer-motion";

interface IProps {
  card: {
    id: number;
    value: string;
    matched: boolean;
  };
  onClick: () => void;
  isFlipped: boolean;
}

export const StickerCard: React.FC<IProps> = ({ card, onClick, isFlipped }) => {
  return (
    <motion.div
      className="w-20 h-28 p-3 bg-blue-500 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center text-4xl"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
      >
        {isFlipped ? card.value : `❓`}
      </motion.div>
    </motion.div>
  );
};
