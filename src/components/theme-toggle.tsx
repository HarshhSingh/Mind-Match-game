'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 hover:bg-transparent"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 text-yellow-200" />
      ) : (
        <Moon className="h-6 w-6 text-slate-900" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

