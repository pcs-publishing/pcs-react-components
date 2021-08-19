import { useEffect } from 'react'

export default function useCallOnKeyEvent(event: 'keyup' | 'keypress' | 'keydown', key: string, fn: () => void) {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.code === key) fn()
    }

    document.addEventListener(event, keyListener)
    return () => {
      document.removeEventListener(event, keyListener)
    }
  }, [key, fn])
}
