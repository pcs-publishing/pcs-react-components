import Color from 'color'
import { css } from '../../../theme-styled'

export const activeStyle = css`
  color: ${props => props.theme.colors.text.onNavigation} !important;
`

export const inactiveStyle = css`
   color: ${(props) => {
    const iconColor = (new Color(props.theme.colors.text.onNavigation)).rgb().array()
    return `rgba(${iconColor}, 0.6)`
  }};
`

export default css<{ $active: boolean }>`
  ${inactiveStyle}
  
  :hover {
    ${activeStyle}
  }

  ${props => props.$active ? activeStyle : ''}
`