import useCallOnKeyUp from './useCallOnKeyUp'

export default function useCallOnEscapeUp(fn: () => void) {
  const ESCAPE_KEY = 27
  return useCallOnKeyUp(ESCAPE_KEY, fn)
}
