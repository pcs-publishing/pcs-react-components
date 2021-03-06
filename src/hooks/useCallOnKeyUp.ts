import useCallOnKeyEvent from './useCallOnKeyEvent'

export default function useCallOnKeyUp(key: string, fn: () => void) {
  useCallOnKeyEvent('keyup', key, fn)
}
