import { Theme } from '../definitions/theme'
import { css } from '../theme-styled'

const COLORS = {
  BASE: '#ecf0f1',
  BUTTON: '#d4d7df',
  BUTTON_HOVER: '#e9ebef',
  BUTTON_TEXT: '#191b20',
  PRIMARY: '#273c75',
  PRIMARY_HOVER: '#7a92d2',
  BORDER: '#ddd',
  TEXT: '#2c3e50'
}

const defaultTheme: Theme = {
  name: 'Default Theme',
  colors: {
    base: COLORS.BASE,
    primary: COLORS.PRIMARY,
    primaryHover: COLORS.PRIMARY_HOVER,
    text: {
      onBase: COLORS.TEXT,
      onPrimary: COLORS.BASE,
      onNavigation: COLORS.BASE,
      onFullScreenScene: COLORS.BASE
    },
    button: {
      standard: COLORS.BUTTON,
      standardHover: COLORS.BUTTON_HOVER,
      standardText: COLORS.BUTTON_TEXT
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
    fullScreenScene: css`
      background: linear-gradient(90deg, rgb(43, 77, 130), rgb(40, 144, 172)); ;
    `
  },
  border: css`
    border: 1px solid ${COLORS.BORDER};
    border-radius: 3px;
  `,
  dragOverOutline: css`
    outline: 2px dashed ${COLORS.BORDER};
  `,
  pushNotification: {
    text: 'black',
    background: 'white',
    border: 'rgba(0, 0, 0, 0.5)'
  }
}

export default defaultTheme
