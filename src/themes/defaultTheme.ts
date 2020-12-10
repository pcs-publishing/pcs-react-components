import { Theme } from '../definitions/theme';
import { css } from '../theme-styled'

const COLORS = {
  BASE: '##ecf0f1',
  PRIMARY: '#e056fd',
  BORDER: '#333',
  TEXT: '#2c3e50'
}

const defaultTheme: Theme = {
  colors: {
    base: COLORS.BASE,
    primary: COLORS.PRIMARY,
    text: {
      onBase: COLORS.TEXT,
      onPrimary: COLORS.BASE
    }
  },
  border: css`
    border: 1px solid ${COLORS.BORDER};
    border-radius: 3px;
  `,
  dragOverOutline: css`
    outline: 2px dashed ${COLORS.BORDER}l
  `
}

export default defaultTheme