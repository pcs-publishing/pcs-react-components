import useCallOnKeyUp from './useCallOnKeyUp'

export default function useCallOnEnterUp(fn: () => void) {
  const ENTER_KEY = 13
  return useCallOnKeyUp(ENTER_KEY, fn)
}
