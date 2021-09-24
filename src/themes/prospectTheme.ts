import { Theme } from '../definitions/theme'
import { css } from '../theme-styled'

const COLORS = {
  BASE: 'white',
  PRIMARY: '#F89E4C',
  BORDER: '#eee',
  TEXT: '#2c3e50'
}

const prospectTheme: Theme = {
  name: 'Prospect Theme',
  colors: {
    base: COLORS.BASE,
    primary: COLORS.PRIMARY,
    text: {
      onBase: COLORS.TEXT,
      onPrimary: COLORS.BASE,
      onNavigation: COLORS.BASE,
      onFullScreenScene: COLORS.BASE
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
      background-image: radial-gradient(
          circle at center center,
          rgba(33, 33, 33, 0),
          rgb(33, 33, 33)
        ),
        repeating-linear-gradient(
          135deg,
          rgb(33, 33, 33) 0px,
          rgb(33, 33, 33) 1px,
          transparent 1px,
          transparent 4px
        ),
        repeating-linear-gradient(
          45deg,
          rgb(56, 56, 56) 0px,
          rgb(56, 56, 56) 5px,
          transparent 5px,
          transparent 6px
        ),
        linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33));
    `
  },
  border: css`
    border: 1px solid ${COLORS.BORDER};
    border-radius: 5px;
  `,
  dragOverOutline: css`
    outline: 2px dashed ${COLORS.BORDER};
  `,
  pushNotification: {
    text: 'white',
    background: 'rgba(0,0,0,0.65)',
    border: 'white'
  }
}

export default prospectTheme
