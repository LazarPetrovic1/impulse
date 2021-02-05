import { useState } from 'react'

function useToggle (initialValue = false) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('isDarkTheme')) || initialValue)
  const toggle = (value) => {
    if (value) {
      setState(value)
      localStorage.setItem('isDarkTheme', value)
    } else {
      setState(!state)
      localStorage.setItem('isDarkTheme', !state)
    }
  }
  return [state, toggle]
}

export default useToggle
