import { useState, useCallback } from 'react';

function useCardRatio (initialRatio) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio)

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isLandscape = height <= width
      const ratio = isLandscape ? width / height : height / width

      setAspectRatio(ratio)
    }
  }, [])

  return [aspectRatio, calculateRatio]
}

export default useCardRatio;
