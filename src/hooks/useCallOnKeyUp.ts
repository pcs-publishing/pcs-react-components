import { useEffect } from 'react'

export default function useCallOnKeyUp(keyCode: number, fn: () => void) {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.code.toString() === keyCode.toString()) fn()
    }

    document.addEventListener('keyup', keyListener)
    return () => {
      document.removeEventListener('keyup', keyListener)
    }
  }, [keyCode, fn])
}
