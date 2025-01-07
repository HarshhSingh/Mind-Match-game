import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IEvent {
  title: string;
  start: Date | null;
  end?: Date | null;
  id: string | null;
}
export type TDifficulty = "easy" | "medium" | "hard";
interface IStoreState {
  highscores: string[];
  difficulty: TDifficulty;
}
interface IStore extends IStoreState {
  setDifficulty: (difficulty: TDifficulty) => Promise<string>;
}

export const useMindMatchStore = create<IStore>()(
  persist(
    (set) => ({
      highscores: [],
      difficulty: "easy",
      setDifficulty: (difficulty: TDifficulty) =>
        new Promise((resolve) => {
          set(() => ({
            difficulty: difficulty,
          }));
          resolve(`Difficulty level ${difficulty} selected`);
        }),
    }),
    {
      name: "mindMatch",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
