import { useState } from 'react'

function useColour (initialValue = "#fff") {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('textColour')) || initialValue)
  const setColour = (val) => {
    setState(val)
    localStorage.setItem('textColour', JSON.stringify(val))
  }
  return [state, setColour]
}

export default useColour
