import { useContext } from 'react'
import { ThemeContext } from '../theme-styled'

export default function useTheme() {
 return useContext(ThemeContext)
}