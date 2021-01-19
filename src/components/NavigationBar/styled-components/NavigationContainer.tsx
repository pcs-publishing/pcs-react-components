import { Orientation } from '..'
import styled from '../../../theme-styled'

export default styled.div < { $collapsed: boolean, $orientation: Orientation } > `
  padding: ${(props) => (props.$collapsed ? '5px' : '10px')};

  width: auto;
  display: flex;

  ${props => props.$orientation === 'vertical' ? `
      height: 100%;
      max-width: ${props.$collapsed ? '60px' : '300px'};
      flex-direction: column;
    ` : `
      width: 100%;
      height: 60px;
      flex-direction: row;
  `}
  
  ${props => props.theme.backgrounds.navigation}
  
  color: ${props => props.theme.colors.text.onNavigation};

  ${(props) => {
    if (props.$collapsed) {
      return `padding-top: 10px;`
    }
  }}

  * {
    box-shadow: none !important;
  }

  :hover .collapse-button-container {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s linear;
  }

  .ui.vertical.menu {
    width: 100% !important;
  }
`
