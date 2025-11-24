"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface ColorContextType {
  primaryColor: string
  setPrimaryColor: (color: string) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export const useColor = () => {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider")
  }
  return context
}

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] = useState("#00FFBB")

  // Helper function to adjust color brightness
  const adjustColor = useCallback((color: string, amount: number): string => {
    const usePound = color[0] === "#"
    const col = usePound ? color.slice(1) : color

    // Validate hex color
    if (!/^[0-9A-F]{6}$/i.test(col)) {
      return color // Return original if invalid
    }

    const num = Number.parseInt(col, 16)
    let r = (num >> 16) + amount
    let g = ((num >> 8) & 0x00ff) + amount
    let b = (num & 0x0000ff) + amount

    r = Math.max(0, Math.min(255, r))
    g = Math.max(0, Math.min(255, g))
    b = Math.max(0, Math.min(255, b))

    return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  }, [])

  // Validate and set primary color
  const setPrimaryColor = useCallback((color: string) => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if (hexRegex.test(color)) {
      // Convert 3-digit hex to 6-digit
      let normalizedColor = color
      if (color.length === 4) {
        normalizedColor = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
      }
      setPrimaryColorState(normalizedColor)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Update CSS custom properties when color changes
      document.documentElement.style.setProperty("--dynamic-primary", primaryColor)

      // Calculate darker and lighter variations for gradients and shadows
      const darkerShade = adjustColor(primaryColor, -40)
      const lighterShade = adjustColor(primaryColor, 20)

      document.documentElement.style.setProperty("--dynamic-primary-dark", darkerShade)
      document.documentElement.style.setProperty("--dynamic-primary-light", lighterShade)
    }
  }, [primaryColor, adjustColor])

  return <ColorContext.Provider value={{ primaryColor, setPrimaryColor }}>{children}</ColorContext.Provider>
}
