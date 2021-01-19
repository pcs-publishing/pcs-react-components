import { Theme } from '../definitions/theme'
import { css } from '../theme-styled'

const COLORS = {
  BASE: 'white',
  PRIMARY: '#7ed6df',
  BORDER: '#eee',
  TEXT: '#2c3e50'
}

const alternateTheme: Theme = {
  name: 'Alternate Theme',
  colors: {
    base: COLORS.BASE,
    primary: COLORS.PRIMARY,
    text: {
      onBase: COLORS.TEXT,
      onPrimary: COLORS.BASE,
      onNavigation: COLORS.BASE,
      onLogin: COLORS.BASE
    }
  },
  backgrounds: {
    main: css`
      background-color: white;
    `,
    offset: css`
      background-color: #eee;
    `,
    offsetEmphasis: css`
      background-color: #ddd;
    `,
    navigation: css`
      background-color: #4f5c72;
    `,
    login: css`
      background-color: ${COLORS.PRIMARY};
    `
  },
  border: css`
    border: 1px solid ${COLORS.BORDER};
    border-radius: 5px;
  `,
  dragOverOutline: css`
    outline: 2px dashed ${COLORS.BORDER};
  `
}

export default alternateTheme
