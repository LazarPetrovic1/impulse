import React, { createContext } from 'react'
import useLegacyFont from '../hooks/useLegacyFont';
export const FontContext = createContext()

export function FontProvider (props) {
  const [isLegacyFont, toggleLegacyFont] = useLegacyFont()

  return (
    <FontContext.Provider value={{ isLegacyFont, toggleLegacyFont }}>
      {props.children}
    </FontContext.Provider>
  )
}
