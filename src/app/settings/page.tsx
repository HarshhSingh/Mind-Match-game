"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMindMatchStore } from "@/hooks/useMatchStore";

export default function SettingsDialog() {
  const { difficulty, setDifficulty } = useMindMatchStore();
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.push("/")}>
      <DialogContent className="sm:max-w-md border-purple-500/20 bg-transparent  text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Game Settings
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-white/90 mb-4">
                    Difficulty Level
                  </h3>
                  <RadioGroup
                    value={difficulty}
                    onValueChange={setDifficulty}
                    className="grid gap-4"
                  >
                    {["easy", "medium", "hard"].map((level) => (
                      <motion.div
                        key={level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Label
                          htmlFor={level}
                          className="flex items-center space-x-3 space-y-0 rounded-lg border border-purple-500/30 p-4 hover:bg-purple-500/10 cursor-pointer transition-colors"
                        >
                          <RadioGroupItem value={level} id={level} />
                          <span className="text-white capitalize">{level}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => router.push("/")}
                  >
                    Save Settings
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
