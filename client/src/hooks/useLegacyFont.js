import { useState } from 'react'

function useLegacyFont (initialValue = false) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('isLegacyFont')) || initialValue)
  const toggleLegacyFont = () => {
    setState(!state)
    localStorage.setItem('isLegacyFont', !state)
  }
  return [state, toggleLegacyFont]
}

export default useLegacyFont
