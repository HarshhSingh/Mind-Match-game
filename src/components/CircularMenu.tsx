"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface MenuItem {
  title: string
  delay: number
  link: string
}

interface CircularMenuProps {
  items: MenuItem[]
}

export function CircularMenu({ items }: CircularMenuProps) {
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Circular background */}
      <div className="menu-circle-bg menu-circle-inner" />
      <div className="menu-circle-bg menu-circle-outer" />

      {/* Menu items */}
      <nav className="menu-nav">
        {items.map(({ title, delay, link }) => (
          <motion.button
            key={title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push(link)}
            transition={{ delay }}
            onHoverStart={() => setHoveredItem(title)}
            onHoverEnd={() => setHoveredItem(null)}
            className="menu-item"
          >
            {hoveredItem === title && (
              <motion.div
                layoutId="menu-hover"
                className="menu-hover-indicator"
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
  )
}

