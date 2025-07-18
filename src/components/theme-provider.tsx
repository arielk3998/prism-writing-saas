'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Listen for theme initialization from layout script
    const handleThemeInit = (event: CustomEvent) => {
      const initialTheme = event.detail.theme
      setTheme(initialTheme)
    }
    
    window.addEventListener('theme-initialized', handleThemeInit as EventListener)
    
    // Check localStorage for saved theme (fallback)
    try {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme)
      } else {
        // Check system preference
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        setTheme(systemPreference)
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      setTheme(defaultTheme)
    }
    
    return () => {
      window.removeEventListener('theme-initialized', handleThemeInit as EventListener)
    }
  }, [defaultTheme])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('theme', theme)
      } catch (error) {
        console.error('Error saving theme to localStorage:', error)
      }
      
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      
      // Also set data attribute for better CSS targeting
      root.setAttribute('data-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return a fallback theme context for SSR/build time
    return {
      theme: 'light' as Theme,
      setTheme: () => {},
      toggleTheme: () => {}
    }
  }
  return context
}
