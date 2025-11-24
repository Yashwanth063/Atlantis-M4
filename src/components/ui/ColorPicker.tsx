"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useColor } from "./ColorContext"

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Helper function to convert Hex to HSL
function hexToHsl(hex: string): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0
  // Handle 3-digit hex
  if (hex.length === 4) {
    r = Number.parseInt(hex[1] + hex[1], 16)
    g = Number.parseInt(hex[2] + hex[2], 16)
    b = Number.parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = Number.parseInt(hex.substring(1, 3), 16)
    g = Number.parseInt(hex.substring(3, 5), 16)
    b = Number.parseInt(hex.substring(5, 7), 16)
  }

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

// Helper function to convert Hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0
  // Handle 3-digit hex
  if (hex.length === 4) {
    r = Number.parseInt(hex[1] + hex[1], 16)
    g = Number.parseInt(hex[2] + hex[2], 16)
    b = Number.parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = Number.parseInt(hex.substring(1, 3), 16)
    g = Number.parseInt(hex.substring(3, 5), 16)
    b = Number.parseInt(hex.substring(5, 7), 16)
  }
  return [r, g, b]
}

const ColorPicker: React.FC = () => {
  const { primaryColor, setPrimaryColor } = useColor()
  const [currentHue, setCurrentHue] = useState(0) // Default hue

  // Update slider hue when primaryColor changes from external source
  useEffect(() => {
    try {
      const [h] = hexToHsl(primaryColor)
      setCurrentHue(h)
    } catch (error) {
      console.error("Error converting hex to HSL for hue:", error)
    }
  }, [primaryColor])

  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newHue = Number.parseInt(event.target.value, 10)
      setCurrentHue(newHue)

      try {
        // Keep saturation and lightness at 100% and 50% for a vibrant hue slider
        const newHexColor = hslToHex(newHue, 100, 50)
        setPrimaryColor(newHexColor)
      } catch (error) {
        console.error("Error converting HSL to hex:", error)
      }
    },
    [setPrimaryColor],
  )

  // Get the background for the slider track (full hue spectrum)
  const getSliderTrackBackground = useCallback(() => {
    return `linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`
  }, [])

  // Get the RGB components as a string for CSS variable
  const primaryRgbComponents = useCallback(() => {
    const [r, g, b] = hexToRgb(primaryColor)
    return `${r}, ${g}, ${b}`
  }, [primaryColor])

  return (
    <div className="flex flex-col items-center justify-center gap-4 backdrop-blur-sm rounded-xl shadow-2xl w-full">
      <div className="w-full flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="360"
          value={currentHue}
          onChange={handleSliderChange}
          className="w-full h-2.5 rounded-full appearance-none outline-none transition-all duration-200 color-picker-slider"
          style={{
            background: getSliderTrackBackground(),
              borderRadius: "9999px", // Full rounded ends
              ["--primary-rgb-components" as string]: primaryRgbComponents(), // Pass RGB components as CSS variable
          }}
          aria-label="Adjust theme color hue"
        />
      </div>
    </div>
  )
}

export default ColorPicker
