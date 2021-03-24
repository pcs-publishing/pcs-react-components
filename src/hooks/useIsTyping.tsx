import { useState, useEffect } from 'react'
export function useIsTyping(value: unknown, delay: number): [isTyping: boolean, setIsTyping: (isTyping: boolean) => void] {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeoutId: number | undefined
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (isTyping) {
      timeoutId = setTimeout(() => {
        setIsTyping(false)
      }, delay)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isTyping, value])


  return [isTyping, setIsTyping]
}
