"use client";

import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppLayout } from "@/components/AppLayout";
import { CircularMenu } from "@/components/CircularMenu";

const menuItems = [
  { title: "PLAY", delay: 0.2, link: "/game" },
  { title: "SETTINGS", delay: 0.4, link: "/settings" },
  { title: "STATS", delay: 0.6, link: "" },
  { title: "QUIT", delay: 0.8, link: "" },
];

export default function LandingScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout showTitle>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <CircularMenu items={menuItems} />
    </AppLayout>
  );
}
