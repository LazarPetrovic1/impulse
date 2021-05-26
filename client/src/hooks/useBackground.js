import { useState } from 'react'

function useBackground (initialValue = "transparent") {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('backgroundColour')) || initialValue)
  const setColour = (val) => {
    setState(val)
    localStorage.setItem('backgroundColour', JSON.stringify(val))
  }
  return [state, setColour]
}

export default useBackground
