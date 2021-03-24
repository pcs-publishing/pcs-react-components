import { useEffect, useState, useCallback } from 'react'

export default function useDebouncedCallback<T extends (...args: any[]) => any>(
  fn: T,
  dependencies: any[],
  delay: number
): T {
  const [timeoutId, setTimeoutId] = useState<number | undefined>()
  const callback = useCallback(fn, [...dependencies, fn])
  const debouncedCallback = (...args: unknown[]) => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(
        setTimeout(() => {
          resolve(callback(...args))
        }, delay)
      )
    })
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return debouncedCallback as T
}
