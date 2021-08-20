import { useState } from 'react'
import useCallOnKeyDown from './useCallOnKeyDown'
import useCallOnKeyUp from './useCallOnKeyUp'

const useIsKeyDown = (key: string): boolean => {
  const [isKeyDown, setIsKeyDown] = useState(false)

  useCallOnKeyDown(key, () => {
    setIsKeyDown(true)
  })

  useCallOnKeyUp(key, () => {
    setIsKeyDown(false)
  })

  return isKeyDown
}

export default useIsKeyDown
