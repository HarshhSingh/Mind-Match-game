"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

const menuItems = [
  { title: "PLAY", delay: 0.2, link: "/game" },
  { title: "SETTINGS", delay: 0.4, link: "/settings" },
  { title: "STATS", delay: 0.6, link: "" },
  { title: "QUIT", delay: 0.8, link: "" },
];

export default function LandingScreen() {
  const { theme, setTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(157,23,77,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,182,255,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(157,23,77,0.2),transparent_50%)]" />
      </div>

      {/* Stars effect */}
      {/* can change/remove opacity according to theme */}
      <div className="absolute inset-0 opacity-100 transition-opacity duration-500 dark:opacity-100">
        {[...Array(1000)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white dark:bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <ThemeToggle theme={theme} setTheme={setTheme} />

        {/* Game title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-6xl font-bold tracking-wider text-slate-800 dark:text-white"
        >
          Mind Match Game
        </motion.h1>

        {/* Menu items */}
        <div className="relative">
          {/* Circular background */}
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 dark:border-purple-500/30" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/50 dark:border-purple-500/20" />

          {/* Menu items */}
          <nav className="relative flex flex-col items-center gap-6">
            {menuItems.map(({ title, delay, link }) => (
              <motion.button
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push(link)}
                transition={{ delay }}
                onHoverStart={() => setHoveredItem(title)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative text-2xl font-medium text-slate-700 transition-colors dark:text-slate-300"
              >
                {hoveredItem === title && (
                  <motion.div
                    layoutId="menu-hover"
                    className="absolute -left-4 h-full w-1 bg-slate-800 dark:bg-purple-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {title}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
