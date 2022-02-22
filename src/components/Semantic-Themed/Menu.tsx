import React from 'react'
import { Menu, MenuProps } from 'semantic-ui-react'
import styled from '../../theme-styled'

const ThemedMenu = styled(Menu)`
  ${props => props.theme.menu || ''}

  .item:last {
    border-radius-top-right: 3px;
    border-radius-bottom-right: 3px;
  }
`

const StyledMenu: React.FunctionComponent<MenuProps> = (props) => {
  return <ThemedMenu {...props}>
    {props.children}
  </ThemedMenu>
}

export default StyledMenu
