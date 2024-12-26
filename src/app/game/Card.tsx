import { CardContent, Card as Cards } from "@/components/ui/card";

interface IProps {
  card: {
    id: number;
    value: string;
    matched: boolean;
  };
  onClick: () => void;
  isFlipped: boolean;
}
export const Card = ({ card, onClick, isFlipped }: IProps) => {
  return (
    <Cards onClick={onClick}>
      {/* To-do: animate onClick card flip */}
      <CardContent
        className={`w-20 h-28 p-3 flex items-center justify-center text-2xl font-bold
           cursor-pointer bg-blue-500 rounded-md ${
             isFlipped || card.matched ? "bg-white text-black" : ""
           }`}
      >
        {isFlipped || card.matched ? card.value : "❓"}
      </CardContent>
    </Cards>
  );
};
