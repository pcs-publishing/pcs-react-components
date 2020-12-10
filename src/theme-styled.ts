import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'
import { Theme } from './definitions/theme'

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle,
  ThemeContext
} = styledComponents as ThemedStyledComponentsModule<Theme>

export default styled
export { css, keyframes, ThemeProvider, createGlobalStyle, ThemeContext }
