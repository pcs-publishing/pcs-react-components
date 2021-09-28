import useCallOnKeyEvent from './useCallOnKeyEvent'

export default function useCallOnKeyPress(key: string, fn: () => void) {
  useCallOnKeyEvent('keypress', key, fn)
}
