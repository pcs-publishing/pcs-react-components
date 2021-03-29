import { useEffect, useState, useRef } from 'react'

export default function useDelayedFunction<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  const [timeoutId, setTimeoutId] = useState<number | undefined>()

  const debouncedFunction = ((...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(
      setTimeout(() => {
        fn(...args)
      }, delay)
    )
  }) as T

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return debouncedFunction
}
