import useCallOnKeyEvent from './useCallOnKeyEvent'

export default function useCallOnKeyDown(key: string, fn: () => void) {
  useCallOnKeyEvent('keydown', key, fn)
}
