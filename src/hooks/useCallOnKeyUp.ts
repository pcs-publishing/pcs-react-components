import { useEffect } from 'react'

export default function useCallOnKeyUp(key: string, fn: () => void) {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.code === key) fn()
    }

    document.addEventListener('keyup', keyListener)
    return () => {
      document.removeEventListener('keyup', keyListener)
    }
  }, [key, fn])
}
