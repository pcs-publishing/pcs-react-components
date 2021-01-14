import { Orientation } from '..'
import styled from '../../../theme-styled'

export default styled.div < { $collapsed: boolean, $orientation: Orientation } > `
  padding: ${(props) => (props.$collapsed ? '5px' : '10px')};

  width: auto;
  display: flex;
  flex-direction: column;

  ${props => props.$orientation === 'vertical' ? `
      height: 100%;
      max-width: 300px;
  ` : `
      width: 100%;
  `}
  
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text.onPrimary};

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
`
