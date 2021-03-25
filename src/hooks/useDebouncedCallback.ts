import { useEffect, useRef, useCallback } from 'react'
import { debounce, DebouncedFunc } from 'lodash'

export default function useDebouncedCallback<T extends (...args: any[]) => any>(
  fn: T,
  dependencies: any[],
  delay: number
): DebouncedFunc<T> | T {
  const callback = useCallback(fn, [...dependencies, fn])
  let debouncedCallbackRef = useRef<DebouncedFunc<T>>()

  useEffect(() => {
    debouncedCallbackRef.current = debounce(callback, delay)

    return () => {
      if (debouncedCallbackRef.current) {
        debouncedCallbackRef.current.cancel()
      }

      debouncedCallbackRef.current = undefined
    }
  }, [callback, delay])

  return debouncedCallbackRef.current || callback
}
