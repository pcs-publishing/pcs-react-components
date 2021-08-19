import useCallOnKeyEvent from './useCallOnKeyEvent'

export default function useCallOnKeyUp(key: string, fn: () => void) {
  useCallOnKeyEvent('keypress', key, fn)
}
