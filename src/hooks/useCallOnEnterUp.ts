import useCallOnKeyUp from './useCallOnKeyUp'

export default function useCallOnEnterUp(fn: () => void) {
  return useCallOnKeyUp('Enter', fn)
}
