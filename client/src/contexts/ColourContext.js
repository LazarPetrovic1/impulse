import React, { createContext } from 'react'
import useColour from '../hooks/useColour';
import useBackground from '../hooks/useBackground';
export const ColourContext = createContext()

export function ColourProvider (props) {
  const [colour, setColour] = useColour()
  const [background, setBackground] = useBackground()

  return (
    <ColourContext.Provider value={{ colour, setColour, background, setBackground }}>
      {props.children}
    </ColourContext.Provider>
  )
}
