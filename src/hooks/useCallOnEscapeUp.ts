import useCallOnKeyUp from './useCallOnKeyUp'

export default function useCallOnEscapeUp(fn: () => void) {
  return useCallOnKeyUp('Escape', fn)
}
