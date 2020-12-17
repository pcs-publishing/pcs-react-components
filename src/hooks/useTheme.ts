import { useContext } from 'react'
import { ThemeContext } from '../theme-styled'

export default function useTheme() {
  const themeContext = useContext(ThemeContext)
  return themeContext
}