"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  top: string
  left: string
  animationDuration: string
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate stars only on the client side
    const newStars = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 3}s`,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="stars-container dark:opacity-100">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
    </div>
  )
}

