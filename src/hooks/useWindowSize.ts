import { useCallback, useEffect, useState } from 'react'

type WindowSizeProperty = 'innerWidth' | 'innerHeight'

function useWindowSize(windowSizeProperty: WindowSizeProperty) {
  const [windowSize, setWindowSize] = useState(
    getCurrentWindowSize(windowSizeProperty)
  )
  const handleResize = useCallback(
    () => setWindowSize(getCurrentWindowSize(windowSizeProperty)),
    [setWindowSize, windowSizeProperty]
  )

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return windowSize
}

function getCurrentWindowSize(windowSizeProperty: WindowSizeProperty) {
  return typeof window !== 'undefined' ? window[windowSizeProperty] : 0
}

export default useWindowSize
