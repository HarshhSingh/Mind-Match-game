"use client"

import type { ReactNode } from "react"

import { motion } from "framer-motion"
import { StarsBackground } from "./StarsBackground"

interface AppLayoutProps {
  children: ReactNode
  showTitle?: boolean
  title?: string
}

export function AppLayout({ children, showTitle = false, title = "Mind Match Game" }: AppLayoutProps) {
  return (
    <div className="app-container">
      {/* Stars effect */}
      <StarsBackground />

      <div className="menu-container">
        {showTitle && (
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="game-title">
            {title}
          </motion.h1>
        )}

        {children}
      </div>
    </div>
  )
}

