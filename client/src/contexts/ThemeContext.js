import React, { createContext } from 'react'
import useToggleState from '../hooks/useToggleState'
export const ThemeContext = createContext()

export function ThemeProvider (props) {
  const [isDarkTheme, toggleTheme] = useToggleState()

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
